"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import StepTickets from "./StepTickets";
import StepCustomer from "./StepCustomer";
import StepPayment from "./StepPayment";
import StepSuccess from "./StepSuccess";
import { cn } from "@/lib/utils";

export type CartItem = {
  ticketTypeId: string;
  name: string;
  price: number;
  quantity: number;
};

export type CustomerData = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
};

export type OrderData = {
  orderId: string;
  orderNumber: string;
  total: number;
  paymentMethod: "pix" | "credit_card";
  pixQrCode?: string;
  pixCopyCola?: string;
};

export type CheckoutState = {
  cart: CartItem[];
  coupon: { code: string; discount: number } | null;
  customer: CustomerData | null;
  order: OrderData | null;
};

const steps = [
  { id: 1, label: "Ingressos" },
  { id: 2, label: "Dados" },
  { id: 3, label: "Pagamento" },
  { id: 4, label: "Confirmação" },
];

export default function CheckoutFlow() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CheckoutState>({
    cart: [],
    coupon: null,
    customer: null,
    order: null,
  });

  const update = (patch: Partial<CheckoutState>) =>
    setState((s) => ({ ...s, ...patch }));

  const subtotal = state.cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = state.coupon?.discount ?? 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main flow */}
      <div className="lg:col-span-2">
        {/* Step indicators */}
        {step < 4 && (
          <div className="flex items-center mb-8">
            {steps.slice(0, 3).map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={cn(
                    "w-8 h-8 clip-corner-sm flex items-center justify-center text-xs font-bold transition-all",
                    step === s.id
                      ? "bg-[#20CD5C] text-black shadow-[0_0_15px_rgba(32,205,92,0.5)]"
                      : step > s.id
                      ? "bg-[#20CD5C]/20 text-[#20CD5C] border border-[#20CD5C]"
                      : "bg-[#1F1F1F] text-[#6B7280]"
                  )}>
                    {step > s.id ? "✓" : s.id}
                  </div>
                  <span className={cn(
                    "text-[10px] uppercase tracking-wider font-heading hidden sm:block",
                    step === s.id ? "text-[#20CD5C]" : "text-[#6B7280]"
                  )}>
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={cn(
                    "h-px w-12 sm:w-20 mx-2 transition-colors",
                    step > s.id ? "bg-[#20CD5C]/50" : "bg-[#1F1F1F]"
                  )} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Steps */}
        {step === 1 && (
          <StepTickets
            cart={state.cart}
            coupon={state.coupon}
            onChange={(cart) => update({ cart })}
            onCoupon={(coupon) => update({ coupon })}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepCustomer
            customer={state.customer}
            onBack={() => setStep(1)}
            onNext={(customer) => { update({ customer }); setStep(3); }}
          />
        )}
        {step === 3 && (
          <StepPayment
            cart={state.cart}
            customer={state.customer!}
            coupon={state.coupon}
            total={total}
            onBack={() => setStep(2)}
            onSuccess={(order) => { update({ order }); setStep(4); }}
          />
        )}
        {step === 4 && (
          <StepSuccess order={state.order!} customer={state.customer!} />
        )}
      </div>

      {/* Order summary (hidden on step 4) */}
      {step < 4 && (
        <div className="lg:col-span-1">
          <div className="bg-[#111111] border border-[#1F1F1F] clip-corner p-6 sticky top-24">
            <h3 className="font-display font-black text-white text-sm uppercase tracking-wider mb-4">
              Resumo do Pedido
            </h3>

            {state.cart.length === 0 ? (
              <p className="text-[#6B7280] text-sm">Nenhum ingresso selecionado.</p>
            ) : (
              <div className="space-y-3">
                {state.cart.map((item) => (
                  <div key={item.ticketTypeId} className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF]">
                      {item.name} <span className="text-[#6B7280]">×{item.quantity}</span>
                    </span>
                    <span className="text-white font-medium tabular-nums">
                      R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                ))}

                <div className="border-t border-[#1F1F1F] pt-3 mt-3">
                  <div className="flex justify-between text-sm text-[#6B7280]">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                  {state.coupon && (
                    <div className="flex justify-between text-sm text-[#20CD5C] mt-1">
                      <span>Desconto ({state.coupon.code})</span>
                      <span>- R$ {discount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold mt-3 pt-3 border-t border-[#1F1F1F]">
                    <span className="text-white">Total</span>
                    <span className="text-[#20CD5C] text-lg">
                      R$ {total.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Event info */}
            <div className="mt-6 pt-4 border-t border-[#1F1F1F] space-y-2 text-xs text-[#6B7280]">
              <div className="flex items-center gap-2">
                <span className="text-[#20CD5C]">📅</span>
                <span>05 de Setembro de 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#20CD5C]">⏰</span>
                <span>10h às 22h</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#20CD5C]">📍</span>
                <span>Goiânia, GO</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
