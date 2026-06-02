"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import EventBackground from "@/components/ui/EventBackground";
import { FAQS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 lg:py-32 relative overflow-hidden">
      <EventBackground variant="dark" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Dúvidas Frequentes"
          title="TUDO QUE VOCÊ PRECISA "
          highlight="SABER"
        />

        <div className="mt-14 space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "clip-corner-sm transition-all duration-300 overflow-hidden",
                open === i ? "glass-green" : "glass glass-hover"
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-5 px-6 py-5 text-left"
              >
                <span className={cn(
                  "font-heading font-600 text-sm sm:text-[0.95rem] leading-snug transition-colors",
                  open === i ? "text-[#20CD5C]" : "text-white"
                )}>
                  {faq.q}
                </span>
                <div className={cn(
                  "flex-shrink-0 w-7 h-7 clip-corner-sm flex items-center justify-center transition-all",
                  open === i
                    ? "bg-[#20CD5C] text-black shadow-[0_0_14px_rgba(32,205,92,0.55)]"
                    : "border border-[rgba(255,255,255,0.1)] text-[#5A6272]"
                )}>
                  {open === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>

              {open === i && (
                <div className="px-6 pb-6 border-t border-[rgba(32,205,92,0.12)]">
                  <p className="font-heading text-sm text-[#D1D5DB] leading-relaxed pt-5">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glow-line max-w-[180px] mx-auto mb-6" />
          <p className="font-heading text-sm text-[#8A94A6]">
            Ainda tem dúvidas?{" "}
            <a href="mailto:contato@xzone2026.com.br" className="text-[#20CD5C] hover:text-[#B3F54E] transition-colors font-700">
              Fale conosco
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
