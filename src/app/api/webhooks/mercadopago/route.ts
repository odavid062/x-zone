import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getPaymentStatus } from "@/lib/mercadopago";
import { nanoid } from "nanoid";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    // Verify webhook signature
    const signature = req.headers.get("x-signature") ?? "";
    const requestId = req.headers.get("x-request-id") ?? "";
    const body = await req.text();

    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET ?? "";
    if (secret) {
      const parts = signature.split(",");
      const ts    = parts.find((p) => p.startsWith("ts="))?.split("=")[1] ?? "";
      const v1    = parts.find((p) => p.startsWith("v1="))?.split("=")[1] ?? "";
      const manifest = `id:${requestId};request-id:${requestId};ts:${ts};`;
      const hmac = crypto.createHmac("sha256", secret).update(manifest).digest("hex");
      if (hmac !== v1) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const data = JSON.parse(body);

    if (data.type === "payment" && data.data?.id) {
      const paymentId = String(data.data.id);
      const mpStatus  = await getPaymentStatus(paymentId);

      const { data: order } = await supabaseAdmin
        .from("orders")
        .select("*, order_items(*)")
        .eq("payment_id", paymentId)
        .single();

      if (order && mpStatus.paid && order.status !== "paid") {
        await supabaseAdmin.from("orders").update({
          status:  "paid",
          paid_at: new Date().toISOString(),
        }).eq("id", order.id);

        // Generate tickets
        const tickets = order.order_items.flatMap((item: { ticket_type_id: string; quantity: number }) =>
          Array.from({ length: item.quantity }, () => ({
            order_id:       order.id,
            ticket_type_id: item.ticket_type_id,
            ticket_code:    `XZ-${nanoid(10).toUpperCase()}`,
          }))
        );
        await supabaseAdmin.from("tickets").insert(tickets);

        // Audit log
        await supabaseAdmin.from("audit_logs").insert({
          entity_type: "order",
          entity_id:   order.id,
          action:      "payment_confirmed",
          payload:     { paymentId, method: order.payment_method },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[webhook/mercadopago]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
