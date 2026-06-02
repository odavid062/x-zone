"use client";

import { useEffect, useState, useCallback } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import LinkButton from "@/components/ui/LinkButton";
import EventBackground from "@/components/ui/EventBackground";
import { EVENT } from "@/lib/constants";

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function useCountdown(target: string): TimeLeft {
  // Start with zeros so SSR and first client render match.
  // Real values populate after mount via useEffect.
  const [t, setT] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calc = useCallback((): TimeLeft => {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [target]);

  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return t;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Liquid glass card */}
      <div className="glass-green clip-corner-sm w-[72px] sm:w-[88px] h-[72px] sm:h-[88px] flex items-center justify-center relative overflow-hidden">
        <span className="font-display text-[2.2rem] sm:text-[2.8rem] text-[#20CD5C] neon-text-green tabular-nums leading-none">
          {String(value).padStart(2, "0")}
        </span>
        {/* Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      </div>
      <span className="font-heading font-600 text-[10px] text-[#5A6272] uppercase tracking-[0.25em]">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection() {
  const time = useCountdown(EVENT.dateISO);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <EventBackground />

      {/* Scan line */}
      <div
        className="absolute inset-x-0 h-[2px] pointer-events-none animate-scan"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(32,205,92,0.6), transparent)",
          filter: "blur(1px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8">

        {/* Eyebrow */}
        <div className="animate-fadeUp opacity-0 [animation-fill-mode:forwards] [animation-delay:0.1s]">
          <div className="glow-line w-40 mx-auto mb-3" />
          <p className="font-heading font-600 text-xs text-[#20CD5C] uppercase tracking-[0.35em]">
            Goiânia · 05 Set 2026 · 10h às 22h
          </p>
          <div className="glow-line w-40 mx-auto mt-3" />
        </div>

        {/* Main title — marca do evento, sempre visível, centralizada */}
        <div className="flex flex-col items-center">
          <h1 className="font-display leading-[0.9] tracking-[0.02em] text-[clamp(6rem,16vw,13rem)] text-white neon-text-white text-center">
            X<span className="text-gradient-green">-</span>ZONE
          </h1>
          <p className="font-display text-[clamp(1.4rem,3.5vw,2.8rem)] text-[#20CD5C] neon-text-green tracking-[0.12em] mt-2 text-center">
            {EVENT.tagline.toUpperCase()}
          </p>
        </div>

        {/* Meta info — liquid glass pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 animate-fadeUp opacity-0 [animation-fill-mode:forwards] [animation-delay:0.35s]">
          {[
            { Icon: Calendar, text: EVENT.date },
            { Icon: Clock,    text: EVENT.time },
            { Icon: MapPin,   text: EVENT.location },
          ].map(({ Icon, text }) => (
            <div key={text} className="glass clip-corner-sm flex items-center gap-2 px-4 py-2">
              <Icon className="w-3.5 h-3.5 text-[#20CD5C] flex-shrink-0" />
              <span className="font-heading font-600 text-xs text-[#D1D5DB] whitespace-nowrap">{text}</span>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="animate-fadeUp opacity-0 [animation-fill-mode:forwards] [animation-delay:0.5s] flex flex-col items-center gap-3">
          <p className="font-heading font-600 text-[11px] text-[#5A6272] uppercase tracking-[0.3em]">
            Faltam para o evento
          </p>
          <div className="flex items-end gap-3 sm:gap-4">
            <CountdownUnit value={time.days}    label="Dias" />
            <span className="font-display text-4xl text-[#20CD5C] neon-text-green mb-5 leading-none">:</span>
            <CountdownUnit value={time.hours}   label="Horas" />
            <span className="font-display text-4xl text-[#20CD5C] neon-text-green mb-5 leading-none">:</span>
            <CountdownUnit value={time.minutes} label="Min" />
            <span className="font-display text-4xl text-[#20CD5C] neon-text-green mb-5 leading-none">:</span>
            <CountdownUnit value={time.seconds} label="Seg" />
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fadeUp opacity-0 [animation-fill-mode:forwards] [animation-delay:0.65s]">
          <LinkButton href="/ingressos" size="xl" className="animate-pulseGlow min-w-[220px] justify-center">
            🎮 Comprar Ingresso
          </LinkButton>
          <LinkButton href="#programacao" variant="glass" size="xl" className="min-w-[200px] justify-center">
            Ver Programação
          </LinkButton>
        </div>

        {/* Social proof */}
        <div className="glass clip-corner-sm px-5 py-3 flex items-center gap-3 animate-fadeUp opacity-0 [animation-fill-mode:forwards] [animation-delay:0.8s]">
          <div className="flex -space-x-1.5">
            {["#20CD5C","#B3F54E","#D0FA40","#20CD5C"].map((c, i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-black" style={{ background: c }} />
            ))}
          </div>
          <span className="font-heading text-xs text-[#8A94A6]">
            Mais de <strong className="text-[#20CD5C]">3.000 pessoas</strong> esperadas
          </span>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 inset-x-0">
        <div className="glow-line" />
      </div>

      {/* Scroll indicator */}
      <a href="#sobre" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#5A6272] hover:text-[#20CD5C] transition-colors animate-float">
        <span className="font-heading text-[10px] uppercase tracking-[0.3em]">Rolar</span>
        <div className="w-5 h-8 rounded-full border border-current flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-current rounded-full animate-bounce" />
        </div>
      </a>
    </section>
  );
}
