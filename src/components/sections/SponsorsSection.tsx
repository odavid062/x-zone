import SectionTitle from "@/components/ui/SectionTitle";
import EventBackground from "@/components/ui/EventBackground";
import { PARTNERS } from "@/lib/constants";

export default function SponsorsSection() {
  return (
    <>
      {/* ── MARCAS QUE JÁ ACREDITAM NO PROJETO ── */}
      <section id="patrocinadores" className="py-28 lg:py-32 relative overflow-hidden">
        <EventBackground variant="dark" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Parceiros e Apoiadores"
            title="MARCAS QUE JÁ ACREDITAM "
            highlight="NO PROJETO"
            description="Empresas que já se conectam com o ecossistema gamer e tecnológico da região"
          />

          {/* Grid de logos — fiel ao layout do media kit */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="glass glass-hover clip-corner-sm flex flex-col items-center justify-center gap-3 p-5 text-center min-h-[100px] group"
              >
                {/* Logo placeholder circular — igual ao layout do media kit */}
                <div className="w-12 h-12 rounded-full bg-[#20CD5C]/10 border border-[rgba(32,205,92,0.2)] flex items-center justify-center group-hover:bg-[#20CD5C]/20 group-hover:border-[rgba(32,205,92,0.5)] transition-all">
                  <span className="font-display text-lg text-[#20CD5C]">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <span className="font-heading font-700 text-[11px] text-[#8A94A6] group-hover:text-white transition-colors uppercase tracking-wider leading-tight">
                  {partner.name}
                </span>
              </div>
            ))}

            {/* "Sua marca aqui" */}
            <div className="clip-corner-sm flex flex-col items-center justify-center gap-2 p-5 text-center min-h-[100px] cursor-pointer group border border-dashed border-[rgba(32,205,92,0.25)] hover:border-[rgba(32,205,92,0.6)] transition-colors col-span-2 sm:col-span-1">
              <span className="font-display text-2xl text-[#20CD5C] group-hover:neon-text-green transition-all">+</span>
              <div className="font-heading text-[11px] text-[#5A6272] group-hover:text-[#20CD5C] transition-colors leading-tight">
                <p>Este espaço</p>
                <p>pode ser seu</p>
              </div>
            </div>
          </div>

          {/* Glow line + CTA */}
          <div className="mt-14">
            <div className="glow-line max-w-[180px] mx-auto mb-6" />
            <p className="font-heading text-sm text-[#8A94A6] text-center mb-4">
              Faça parte de uma comunidade em expansão.
            </p>
            <div className="text-center">
              <a
                href="mailto:patrocinio@xzone2026.com.br"
                className="font-heading font-700 text-xs text-[#20CD5C] uppercase tracking-[0.25em] hover:text-[#B3F54E] transition-colors"
              >
                Fale conosco →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── REALIZAÇÃO — X GAMES + NEXUS ── */}
      <section className="py-24 lg:py-28 relative overflow-hidden">
        <EventBackground variant="dark" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glow-line max-w-sm mx-auto mb-5" />
          <h2 className="font-display text-6xl lg:text-7xl text-white neon-text-white mb-2 tracking-wide">
            REALIZAÇÃO
          </h2>
          <div className="glow-line max-w-sm mx-auto mb-12" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0">
            {/* X Games */}
            <div className="flex-1 flex flex-col items-center gap-4">
              <div className="glass-green clip-corner-lg p-8 w-full max-w-[220px] flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 clip-corner-sm flex items-center justify-center">
                  <span className="font-display text-3xl text-white">X</span>
                </div>
                <div>
                  <div className="font-display text-3xl text-white">X GAMES</div>
                </div>
              </div>
              <span className="font-heading font-700 text-xs text-[#5A6272] uppercase tracking-[0.25em]">
                X GAMES
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-24 self-center"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(32,205,92,0.5), transparent)" }} />
            <div className="sm:hidden glow-line w-32" />

            {/* Nexus */}
            <div className="flex-1 flex flex-col items-center gap-4">
              <div className="glass-green clip-corner-lg p-8 w-full max-w-[220px] flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 clip-corner-sm flex items-center justify-center border border-white/20">
                  <span className="font-display text-3xl text-white">N</span>
                </div>
                <div className="font-display text-3xl text-white">NEXUS</div>
              </div>
              <span className="font-heading font-700 text-xs text-[#5A6272] uppercase tracking-[0.25em]">
                NEXUS
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
