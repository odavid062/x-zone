"use client";

import { Check, Star, Zap } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import LinkButton from "@/components/ui/LinkButton";
import Badge from "@/components/ui/Badge";
import EventBackground from "@/components/ui/EventBackground";
import { TICKET_TYPES } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";

export default function TicketsSection() {
  return (
    <section id="ingressos" className="py-28 lg:py-32 relative overflow-hidden">
      <EventBackground variant="dark" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Garanta Sua Vaga"
          title="ESCOLHA SEU "
          highlight="INGRESSO"
          description="Vagas limitadas. Quanto antes você comprar, mais barato sai. Não fique de fora."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-start">
          {TICKET_TYPES.map((ticket) => {
            const isVIP = ticket.featured;
            return (
              <div
                key={ticket.id}
                className={cn(
                  "clip-corner flex flex-col transition-all duration-500 overflow-hidden",
                  isVIP
                    ? "glass-green border border-[rgba(32,205,92,0.4)] shadow-[0_0_50px_rgba(32,205,92,0.15)] scale-105"
                    : "glass border border-[rgba(255,255,255,0.07)] hover:border-[rgba(32,205,92,0.3)]"
                )}
              >
                {isVIP && (
                  <div className="bg-[#20CD5C] py-2 text-center">
                    <span className="font-heading font-700 text-[11px] text-black uppercase tracking-[0.25em] flex items-center justify-center gap-1.5">
                      <Star className="w-3 h-3" fill="black" />
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className={cn("h-1", isVIP ? "bg-gradient-to-r from-[#20CD5C] to-[#D0FA40]" : "bg-[rgba(255,255,255,0.05)]")} />

                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-6">
                    <h3 className={cn("font-display text-4xl leading-none mb-2", isVIP ? "text-gradient-green" : "text-white")}>
                      {ticket.name.toUpperCase()}
                    </h3>
                    <p className="font-heading text-xs text-[#5A6272] leading-relaxed">{ticket.description}</p>
                  </div>

                  <div className="mb-7 pb-6 border-b border-[rgba(255,255,255,0.07)]">
                    <div className="font-display text-5xl text-white leading-none">
                      {formatCurrency(ticket.price)}
                    </div>
                    <p className="font-heading text-xs text-[#5A6272] mt-2">por pessoa · pagamento único</p>
                    {ticket.price > 30 && (
                      <p className="font-heading text-xs text-[#20CD5C] mt-1">ou em até 3× no cartão</p>
                    )}
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {ticket.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 text-[#20CD5C] flex-shrink-0 mt-1" />
                        <span className="font-heading text-sm text-[#D1D5DB] leading-relaxed">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <LinkButton
                    href={`/ingressos?tipo=${ticket.id}`}
                    variant={isVIP ? "primary" : "glass"}
                    size="lg"
                    className="w-full justify-center"
                  >
                    {isVIP ? (
                      <><Zap className="w-4 h-4" /> COMPRAR VIP</>
                    ) : (
                      `COMPRAR ${ticket.name.toUpperCase()}`
                    )}
                  </LinkButton>
                </div>
              </div>
            );
          })}
        </div>

        {/* Garantias — separadas dos ingressos com respiro */}
        <div className="mt-16 pt-10 border-t border-[rgba(255,255,255,0.06)]">
          <p className="font-heading font-700 text-[10px] text-[#5A6272] uppercase tracking-[0.3em] text-center mb-6">
            Garantias da Compra
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            {[
              { icon: "🔒", title: "Compra Segura",      desc: "Pagamento criptografado com SSL" },
              { icon: "✉️", title: "QR Code no E-mail",   desc: "Ingresso enviado imediatamente após confirmação" },
              { icon: "↩️", title: "Reembolso Garantido", desc: "Cancelamento com 7 dias de antecedência" },
            ].map((g) => (
              <div key={g.title} className="glass clip-corner-sm p-5 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 leading-none">{g.icon}</span>
                <div>
                  <div className="font-heading font-700 text-white text-sm leading-none mb-1.5">{g.title}</div>
                  <div className="font-heading text-xs text-[#8A94A6] leading-relaxed">{g.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
