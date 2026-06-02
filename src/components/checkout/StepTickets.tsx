"use client";

import { useState } from "react";
import { Plus, Minus, Tag, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { TICKET_TYPES } from "@/lib/constants";
import { CartItem } from "./CheckoutFlow";
import { cn, formatCurrency } from "@/lib/utils";

interface Props {
  cart: CartItem[];
  coupon: { code: string; discount: number } | null;
  onChange: (cart: CartItem[]) => void;
  onCoupon: (coupon: { code: string; discount: number } | null) => void;
  onNext: () => void;
}

export default function StepTickets({ cart, coupon, onChange, onCoupon, onNext }: Props) {
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const getQty = (id: string) => cart.find((c) => c.ticketTypeId === id)?.quantity ?? 0;

  const setQty = (ticketTypeId: string, qty: number) => {
    const ticket = TICKET_TYPES.find((t) => t.id === ticketTypeId)!;
    if (qty === 0) {
      onChange(cart.filter((c) => c.ticketTypeId !== ticketTypeId));
      return;
    }
    const existing = cart.find((c) => c.ticketTypeId === ticketTypeId);
    if (existing) {
      onChange(cart.map((c) => c.ticketTypeId === ticketTypeId ? { ...c, quantity: qty } : c));
    } else {
      onChange([...cart, { ticketTypeId, name: ticket.name, price: ticket.price, quantity: qty }]);
    }
  };

  const applyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput.trim().toUpperCase() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error ?? "Cupom inválido");
        onCoupon(null);
      } else {
        onCoupon({ code: data.code, discount: data.discount });
      }
    } catch {
      setCouponError("Erro ao validar cupom. Tente novamente.");
    } finally {
      setCouponLoading(false);
    }
  };

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-2xl mb-1">
          Selecione os Ingressos
        </h2>
        <p className="text-[#6B7280] text-sm">Escolha o tipo e quantidade</p>
      </div>

      {/* Ticket options */}
      <div className="space-y-4">
        {TICKET_TYPES.map((ticket) => {
          const qty = getQty(ticket.id);
          const isVIP = ticket.featured;
          return (
            <div
              key={ticket.id}
              className={cn(
                "bg-[#111111] border clip-corner p-5 transition-all",
                qty > 0
                  ? "border-[#20CD5C]/60 shadow-[0_0_20px_rgba(32,205,92,0.1)]"
                  : isVIP
                  ? "border-[#20CD5C]/30"
                  : "border-[#1F1F1F]"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-black text-white">{ticket.name}</h3>
                    {isVIP && (
                      <span className="text-[10px] bg-[#20CD5C] text-black font-bold px-2 py-0.5 clip-corner-sm uppercase tracking-wider">
                        VIP
                      </span>
                    )}
                  </div>
                  <p className="text-[#6B7280] text-xs mb-3">{ticket.description}</p>
                  <p className="text-[#20CD5C] font-display font-black text-xl">
                    {formatCurrency(ticket.price)}
                  </p>
                </div>

                {/* Quantity control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQty(ticket.id, Math.max(0, qty - 1))}
                    disabled={qty === 0}
                    className="w-8 h-8 clip-corner-sm border border-[#1F1F1F] flex items-center justify-center text-[#6B7280] hover:border-[#20CD5C] hover:text-[#20CD5C] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-display font-black text-white tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(ticket.id, Math.min(10, qty + 1))}
                    className="w-8 h-8 clip-corner-sm bg-[#20CD5C] flex items-center justify-center text-black hover:bg-[#B3F54E] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Perks (expandido se qty > 0) */}
              {qty > 0 && (
                <div className="mt-3 pt-3 border-t border-[#1F1F1F] flex flex-wrap gap-2">
                  {ticket.perks.slice(0, 3).map((p) => (
                    <span key={p} className="text-[10px] text-[#20CD5C] bg-[#20CD5C]/10 px-2 py-1 clip-corner-sm">
                      ✓ {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Coupon */}
      <div className="bg-[#111111] border border-[#1F1F1F] clip-corner p-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-[#20CD5C]" />
          <span className="text-white text-sm font-heading font-bold">Cupom de desconto</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            placeholder="Digite seu cupom"
            className="flex-1 bg-black border border-[#1F1F1F] text-white text-sm px-3 py-2.5 clip-corner-sm placeholder-[#4B5563] focus:border-[#20CD5C] focus:outline-none transition-colors"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={applyCoupon}
            loading={couponLoading}
          >
            Aplicar
          </Button>
        </div>
        {couponError && (
          <p className="text-red-400 text-xs mt-2">{couponError}</p>
        )}
        {coupon && (
          <p className="text-[#20CD5C] text-xs mt-2 flex items-center gap-1">
            <span>✓</span> Cupom <strong>{coupon.code}</strong> aplicado! Desconto de R$ {coupon.discount.toFixed(2).replace(".", ",")}
          </p>
        )}
      </div>

      {/* Next */}
      <Button
        size="lg"
        className="w-full"
        disabled={totalItems === 0}
        onClick={onNext}
      >
        Continuar
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
