import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { z } from "zod";

const schema = z.object({ code: z.string().min(1) });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Código inválido" }, { status: 400 });

  const { code } = parsed.data;

  const { data: coupon } = await supabaseAdmin
    .from("coupons")
    .select("*")
    .eq("code", code.toUpperCase())
    .eq("is_active", true)
    .single();

  if (!coupon) return NextResponse.json({ error: "Cupom não encontrado ou inativo" }, { status: 404 });

  const now = new Date();
  if (coupon.valid_from && now < new Date(coupon.valid_from)) {
    return NextResponse.json({ error: "Cupom ainda não está válido" }, { status: 400 });
  }
  if (coupon.valid_until && now > new Date(coupon.valid_until)) {
    return NextResponse.json({ error: "Cupom expirado" }, { status: 400 });
  }
  if (coupon.max_uses && coupon.uses_count >= coupon.max_uses) {
    return NextResponse.json({ error: "Cupom esgotado" }, { status: 400 });
  }

  // Return discount amount (will be calculated server-side on order creation)
  return NextResponse.json({
    code:          coupon.code,
    discount:      coupon.discount_type === "fixed" ? coupon.discount_value : null,
    discountType:  coupon.discount_type,
    discountValue: coupon.discount_value,
  });
}
