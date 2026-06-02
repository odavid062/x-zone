"use client";

import { Users, Clock, Star, Map } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import EventBackground from "@/components/ui/EventBackground";
import { STATS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users, clock: Clock, star: Star, map: Map,
};

const features = [
  { emoji: "🎮", title: "Arenas Gamer",  desc: "Torneios de MK, FC26, Just Dance, Clash Royale. Compita e mostre seu skill." },
  { emoji: "🎌", title: "Cultura Geek",  desc: "Cosplay, anime, board games, museu de jogos e muito mais para fãs da cultura geek." },
  { emoji: "🎤", title: "Palco Principal",desc: "Dubladores nacionais, criadores de conteúdo, painéis e apresentações ao vivo." },
  { emoji: "🕹️", title: "Free-Play",      desc: "Consoles, retrogaming, VR e karaokê liberados durante todo o evento." },
  { emoji: "💻", title: "Game Jam",       desc: "Desenvolvedores indie com chance de visibilidade e apoio de estúdios parceiros." },
  { emoji: "🏆", title: "Premiações",     desc: "Prêmios em dinheiro, produtos e vouchers para os campeões dos torneios." },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="py-28 lg:py-32 relative">
      <EventBackground variant="dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="O Que É a X-Zone"
          title="UM EVENTO IMERSIVO PARA TODA A "
          highlight="COMUNIDADE"
          description="A X-Zone conecta o universo gamer, desenvolvimento de jogos e cultura geek em uma experiência única. Competição, cultura e entretenimento acontecendo ao mesmo tempo."
        />

        {/* Stats — destaque numérico */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {STATS.map((stat) => {
            const Icon = iconMap[stat.icon];
            return (
              <div key={stat.label} className="glass glass-hover clip-corner p-7 flex flex-col items-center text-center gap-3 group">
                <div className="w-11 h-11 rounded-full bg-[#20CD5C]/10 flex items-center justify-center group-hover:bg-[#20CD5C]/20 transition-colors">
                  <Icon className="w-4 h-4 text-[#20CD5C]" />
                </div>
                <span className="font-display text-[2.75rem] text-gradient-green leading-none mt-1">{stat.value}</span>
                <span className="font-heading font-600 text-[11px] text-[#5A6272] uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Features grid — closer to stats (they're related) */}
        <div className="mt-20">
          <p className="font-heading font-700 text-[11px] text-[#20CD5C] uppercase tracking-[0.3em] text-center mb-8">
            O Que Você Vai Encontrar
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="glass glass-hover clip-corner p-7 group">
                <div className="text-3xl mb-5 group-hover:scale-110 transition-transform inline-block">{f.emoji}</div>
                <h3 className="font-display text-2xl text-white mb-3 group-hover:text-[#20CD5C] transition-colors leading-none">{f.title}</h3>
                <p className="font-heading text-sm text-[#8A94A6] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mercado — idêntico ao media kit: "O MERCADO QUE MOVE A X-ZONE" */}
        <div className="mt-24 glass clip-corner-lg p-8 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="glow-line max-w-[120px] mb-5" />
              <h3 className="font-display text-5xl lg:text-6xl text-white leading-none mb-2">
                O MERCADO QUE
              </h3>
              <h3 className="font-display text-5xl lg:text-6xl text-gradient-green neon-text-green leading-none mb-6">
                MOVE A X-ZONE
              </h3>
              <p className="font-heading text-sm text-[#8A94A6] leading-relaxed max-w-md">
                O mercado de games se consolidou como um dos segmentos mais relevantes da economia
                digital. O ecossistema gamer <strong className="text-white">não é tendência — é presente</strong>.
                Goiânia merece um evento à altura.
              </p>
            </div>

            {/* Os percentuais do media kit */}
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {[
                { value: "82,8%", label: "dos brasileiros consomem jogos digitais" },
                { value: "88,8%", label: "consideram games como principal entretenimento" },
              ].map((item) => (
                <div key={item.value} className="glass-green clip-corner-sm p-6 lg:p-7 text-center flex flex-col">
                  <div className="font-display text-[3rem] lg:text-[3.5rem] text-gradient-green neon-text-green leading-none mb-3">
                    {item.value}
                  </div>
                  <p className="font-heading text-xs text-[#D1D5DB] leading-relaxed flex-1">{item.label}</p>
                  <p className="font-heading text-[10px] text-[#5A6272] mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                    Fonte: Pesquisa Game Brasil 2025
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
