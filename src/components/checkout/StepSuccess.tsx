"use client";

import { CheckCircle, Download, Mail, ArrowRight } from "lucide-react";
import LinkButton from "@/components/ui/LinkButton";
import Button from "@/components/ui/Button";
import { OrderData, CustomerData } from "./CheckoutFlow";

interface Props {
  order: OrderData;
  customer: CustomerData;
}

export default function StepSuccess({ order, customer }: Props) {
  return (
    <div className="text-center space-y-8 py-8">
      {/* Success icon */}
      <div className="relative inline-flex">
        <div className="w-20 h-20 bg-[#20CD5C]/10 rounded-full flex items-center justify-center animate-pulseGlow">
          <CheckCircle className="w-10 h-10 text-[#20CD5C]" />
        </div>
        <div className="absolute inset-0 bg-[#20CD5C]/20 rounded-full blur-xl" />
      </div>

      <div>
        <h2 className="font-display font-black text-white text-3xl mb-2">Pagamento Confirmado!</h2>
        <p className="text-[#6B7280] text-sm">
          Seu ingresso foi enviado para <strong className="text-[#20CD5C]">{customer.email}</strong>
        </p>
      </div>

      {/* Order info */}
      <div className="bg-[#111111] border border-[#20CD5C]/30 clip-corner p-6 text-left max-w-sm mx-auto">
        <div className="space-y-3 text-sm">
          {[
            ["Número do pedido", <span key="num" className="text-[#20CD5C] font-bold font-heading">{order.orderNumber}</span>],
            ["Método",           order.paymentMethod === "pix" ? "PIX" : "Cartão de Crédito"],
            ["Evento",           "X-Zone 2026"],
            ["Data",             "05 Set 2026"],
          ].map(([label, value]) => (
            <div key={String(label)} className="flex justify-between">
              <span className="text-[#6B7280]">{label}</span>
              <span className="text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-[#111111] border border-[#1F1F1F] clip-corner p-6 text-left max-w-sm mx-auto">
        <h3 className="font-display font-black text-white text-sm uppercase tracking-wider mb-4">Próximos passos</h3>
        <ul className="space-y-3">
          {[
            { icon: <Mail className="w-4 h-4" />,     text: `Verifique seu e-mail: ${customer.email}` },
            { icon: <Download className="w-4 h-4" />, text: "Baixe o QR Code do seu ingresso" },
            { icon: "📅",                              text: "Salve o evento: 05/09/2026" },
            { icon: "📍",                              text: "Local confirmado 30 dias antes" },
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="text-[#20CD5C] flex-shrink-0 mt-0.5">{s.icon}</span>
              <span className="text-[#9CA3AF]">{s.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" size="lg">
          <Download className="w-4 h-4" />
          Baixar Comprovante
        </Button>
        <LinkButton href="/" size="lg" className="justify-center">
          Voltar ao Site
          <ArrowRight className="w-4 h-4" />
        </LinkButton>
      </div>

      <div className="text-center">
        <p className="text-[#6B7280] text-xs mb-2">Compartilhe com seus amigos!</p>
        <p className="text-[#20CD5C] text-sm font-bold">#XZone2026</p>
      </div>
    </div>
  );
}
