import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getPaymentStatus } from "@/lib/mercadopago";
import { nanoid } from "nanoid";
import { TICKET_TYPES } from "@/lib/constants";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: order } = await supabaseAdmin
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
  }

  if (order.status === "paid") {
    return NextResponse.json({ paid: true, status: "paid" });
  }

  if (order.status !== "pending" || !order.payment_id) {
    return NextResponse.json({ paid: false, status: order.status });
  }

  // Check with Mercado Pago
  const mpStatus = await getPaymentStatus(order.payment_id);

  if (mpStatus.paid) {
    await supabaseAdmin.from("orders").update({
      status:  "paid",
      paid_at: new Date().toISOString(),
    }).eq("id", id);

    // Generate tickets
    const tickets = order.order_items.flatMap((item: { ticket_type_id: string; quantity: number }) =>
      Array.from({ length: item.quantity }, () => ({
        order_id:       id,
        ticket_type_id: item.ticket_type_id,
        ticket_code:    `XZ-${nanoid(10).toUpperCase()}`,
      }))
    );
    await supabaseAdmin.from("tickets").insert(tickets);

    return NextResponse.json({ paid: true, status: "paid" });
  }

  return NextResponse.json({ paid: false, status: mpStatus.status });
}
