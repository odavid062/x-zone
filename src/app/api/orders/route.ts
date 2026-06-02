import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { supabaseAdmin } from "@/lib/supabase";
import { createPixPayment, createCardPayment } from "@/lib/mercadopago";
import { TICKET_TYPES } from "@/lib/constants";
import { z } from "zod";

const schema = z.object({
  cart: z.array(z.object({
    ticketTypeId: z.string(),
    quantity:     z.number().int().min(1).max(10),
  })),
  customer: z.object({
    name:  z.string().min(3),
    email: z.string().email(),
    cpf:   z.string().min(11),
    phone: z.string().optional(),
  }),
  couponCode:    z.string().optional(),
  paymentMethod: z.enum(["pix", "credit_card"]),
  cardData: z.object({
    number:       z.string(),
    name:         z.string(),
    expiry:       z.string(),
    cvv:          z.string(),
    installments: z.number().int().min(1).max(3),
  }).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const { cart, customer, couponCode, paymentMethod, cardData } = parsed.data;

    // Calculate totals
    let subtotal = 0;
    const itemsWithPrice = cart.map((item) => {
      const type = TICKET_TYPES.find((t) => t.id === item.ticketTypeId);
      if (!type) throw new Error(`Tipo de ingresso inválido: ${item.ticketTypeId}`);
      const total = type.price * item.quantity;
      subtotal += total;
      return { ...item, name: type.name, unitPrice: type.price, totalPrice: total };
    });

    // Validate coupon
    let discount = 0;
    let couponId: string | null = null;
    if (couponCode) {
      const { data: coupon } = await supabaseAdmin
        .from("coupons")
        .select("*")
        .eq("code", couponCode)
        .eq("is_active", true)
        .single();

      if (coupon) {
        const now = new Date();
        const validFrom = coupon.valid_from ? new Date(coupon.valid_from) : null;
        const validUntil = coupon.valid_until ? new Date(coupon.valid_until) : null;
        const withinDate = (!validFrom || now >= validFrom) && (!validUntil || now <= validUntil);
        const withinUses = !coupon.max_uses || coupon.uses_count < coupon.max_uses;

        if (withinDate && withinUses) {
          discount = coupon.discount_type === "percentage"
            ? subtotal * (coupon.discount_value / 100)
            : coupon.discount_value;
          couponId = coupon.id;
        }
      }
    }

    const total = Math.max(0, subtotal - discount);
    const orderNumber = `XZ-2026-${Date.now().toString().slice(-6)}`;

    // Create order in DB
    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number:    orderNumber,
        customer_name:   customer.name,
        customer_email:  customer.email,
        customer_cpf:    customer.cpf.replace(/\D/g, ""),
        customer_phone:  customer.phone,
        subtotal,
        discount,
        total,
        coupon_id:       couponId,
        status:          "pending",
        payment_method:  paymentMethod,
      })
      .select()
      .single();

    if (orderErr || !order) {
      return NextResponse.json({ error: "Erro ao criar pedido" }, { status: 500 });
    }

    // Create order items
    await supabaseAdmin.from("order_items").insert(
      itemsWithPrice.map((item) => ({
        order_id:       order.id,
        ticket_type_id: item.ticketTypeId,
        quantity:       item.quantity,
        unit_price:     item.unitPrice,
        total_price:    item.totalPrice,
      }))
    );

    // Process payment
    if (paymentMethod === "pix") {
      const pix = await createPixPayment({
        orderId:     order.id,
        orderNumber,
        amount:      total,
        payerEmail:  customer.email,
        payerName:   customer.name,
        payerCpf:    customer.cpf,
        description: `X-Zone 2026 — ${itemsWithPrice.map((i) => `${i.quantity}x ${i.name}`).join(", ")}`,
      });

      await supabaseAdmin.from("orders").update({
        payment_id:      pix.paymentId,
        payment_expires_at: pix.expiresAt,
      }).eq("id", order.id);

      if (couponId) {
        await supabaseAdmin.from("coupons")
          .update({ uses_count: supabaseAdmin.rpc("increment", { x: 1 }) as unknown as number })
          .eq("id", couponId);
      }

      return NextResponse.json({
        orderId:     order.id,
        orderNumber,
        pixQrCode:   pix.pixQrCode,
        pixCopyCola: pix.pixCopyCola,
      });
    }

    // Credit card (in production, use MP card token from frontend SDK)
    if (paymentMethod === "credit_card" && cardData) {
      const payment = await createCardPayment({
        orderId:      order.id,
        orderNumber,
        amount:       total,
        payerEmail:   customer.email,
        payerName:    customer.name,
        payerCpf:     customer.cpf,
        cardToken:    "TOKEN_FROM_MP_SDK",
        installments: cardData.installments,
        description:  `X-Zone 2026`,
      });

      if (payment.approved) {
        await supabaseAdmin.from("orders").update({
          status:     "paid",
          payment_id: payment.paymentId,
          paid_at:    new Date().toISOString(),
        }).eq("id", order.id);

        await generateTickets(order.id, itemsWithPrice);
        if (couponId) await incrementCouponUse(couponId);
      } else {
        await supabaseAdmin.from("orders").update({
          status:     "failed",
          payment_id: payment.paymentId,
        }).eq("id", order.id);
        return NextResponse.json({ error: "Pagamento recusado. Verifique os dados do cartão." }, { status: 402 });
      }

      return NextResponse.json({ orderId: order.id, orderNumber });
    }

    return NextResponse.json({ error: "Método de pagamento inválido" }, { status: 400 });

  } catch (err) {
    console.error("[POST /api/orders]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

async function generateTickets(orderId: string, items: Array<{ ticketTypeId: string; quantity: number }>) {
  const tickets = items.flatMap((item) =>
    Array.from({ length: item.quantity }, () => ({
      order_id:       orderId,
      ticket_type_id: item.ticketTypeId,
      ticket_code:    `XZ-${nanoid(10).toUpperCase()}`,
    }))
  );
  await supabaseAdmin.from("tickets").insert(tickets);
}

async function incrementCouponUse(couponId: string) {
  await supabaseAdmin.rpc("increment_coupon_uses", { coupon_id: couponId });
}
