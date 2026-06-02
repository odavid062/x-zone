"use client";

import { useState } from "react";
import { SCHEDULE } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import EventBackground from "@/components/ui/EventBackground";
import { cn } from "@/lib/utils";

type BadgeVariant = "green" | "lime" | "yellow" | "outline";

const typeConfig: Record<string, { label: string; color: BadgeVariant; dot: string }> = {
  palco:    { label: "Palco",    color: "green",   dot: "#20CD5C" },
  torneio:  { label: "Torneio",  color: "lime",    dot: "#B3F54E" },
  geek:     { label: "Geek",     color: "yellow",  dot: "#D0FA40" },
  freeplay: { label: "Free-Play",color: "outline", dot: "#5A6272" },
  cosplay:  { label: "Cosplay",  color: "green",   dot: "#20CD5C" },
};

const allTypes = ["todos","palco","torneio","geek","cosplay","freeplay"] as const;
type FilterType = typeof allTypes[number];

export default function ScheduleSection() {
  const [filter, setFilter] = useState<FilterType>("todos");
  const visible = filter === "todos" ? SCHEDULE : SCHEDULE.filter((s) => s.type === filter);

  return (
    <section id="programacao" className="py-28 lg:py-32 relative overflow-hidden">
      <EventBackground variant="dark" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="05 de Setembro · 10h às 22h"
          title="PROGRAMAÇÃO "
          highlight="COMPLETA"
          description="Um dia inteiro de experiências, conteúdo e entretenimento. Filtre por área de interesse."
        />

        {/* Filter tabs — liquid glass pills */}
        <div className="mt-14 flex flex-wrap justify-center gap-2.5">
          {allTypes.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "font-heading font-700 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 clip-corner-sm",
                filter === t
                  ? "bg-[#20CD5C] text-black shadow-[0_0_24px_rgba(32,205,92,0.45)]"
                  : "glass-pill text-[#8A94A6] hover:text-[#20CD5C]"
              )}
            >
              {t === "todos" ? "Todos" : typeConfig[t]?.label ?? t}
            </button>
          ))}
        </div>

        {/* Timeline — liquid glass rows, comfortable breathing room */}
        <div className="mt-14 space-y-3">
          {visible.map((item, i) => {
            const cfg = typeConfig[item.type];
            return (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-5 sm:gap-7 px-5 sm:px-6 py-4 sm:py-5 clip-corner-sm transition-all duration-300",
                  item.highlight ? "glass-green" : "glass glass-hover"
                )}
              >
                {/* Time */}
                <div className="w-16 flex-shrink-0">
                  <span className="font-display text-lg text-[#20CD5C] tabular-nums leading-none">{item.time}</span>
                </div>

                {/* Dot */}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 hidden sm:block"
                  style={{
                    background: cfg?.dot ?? "#5A6272",
                    boxShadow: item.highlight ? `0 0 10px ${cfg?.dot}` : "none",
                  }}
                />

                {/* Title */}
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  {item.highlight && <span className="text-[#20CD5C] text-sm flex-shrink-0">⭐</span>}
                  <span className={cn(
                    "font-heading text-sm sm:text-[0.95rem] leading-snug",
                    item.highlight ? "text-white font-700" : "text-[#D1D5DB] font-500"
                  )}>
                    {item.title}
                  </span>
                </div>

                {/* Badge */}
                {cfg && (
                  <Badge variant={cfg.color} className="flex-shrink-0 hidden sm:flex">
                    {cfg.label}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend — separated and breathing */}
        <div className="mt-14 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <p className="font-heading font-700 text-[10px] text-[#5A6272] uppercase tracking-[0.3em] text-center mb-5">
            Legenda
          </p>
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {Object.entries(typeConfig).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: val.dot, boxShadow: `0 0 8px ${val.dot}` }}
                />
                <span className="font-heading font-600 text-[11px] text-[#8A94A6] uppercase tracking-[0.2em]">
                  {val.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
