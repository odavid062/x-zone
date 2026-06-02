"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import EventBackground from "@/components/ui/EventBackground";
import { GUESTS } from "@/lib/constants";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29.02 29.02 0 0 0 1 12a29.02 29.02 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29.02 29.02 0 0 0 23 12a29.02 29.02 0 0 0-.46-5.58zM9.75 15.52V8.48L15.5 12l-5.75 3.52z" />
    </svg>
  );
}

export default function GuestsSection() {
  return (
    <section id="convidados" className="py-28 lg:py-32 relative overflow-hidden">
      <EventBackground variant="dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Convidados Especiais"
          title="QUEM VOCÊ VAI "
          highlight="ENCONTRAR"
          description="Dubladores nacionais renomados e criadores de conteúdo que marcaram a cultura geek brasileira."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {GUESTS.map((guest) => (
            <div key={guest.id} className="glass glass-hover clip-corner group overflow-hidden flex flex-col">
              {/* Top accent */}
              <div className={`h-1 bg-gradient-to-r ${guest.gradient}`} />

              <div className="p-8 flex flex-col flex-1">
                {/* Avatar */}
                <div className={`w-16 h-16 bg-gradient-to-br ${guest.gradient} clip-corner-sm flex items-center justify-center mb-6 group-hover:shadow-[0_0_24px_rgba(32,205,92,0.35)] transition-shadow`}>
                  <span className="font-display text-2xl text-black">{guest.name.charAt(0)}</span>
                </div>

                {/* Identity block */}
                <h3 className="font-display text-3xl text-white group-hover:text-[#20CD5C] transition-colors mb-2 leading-none">
                  {guest.name}
                </h3>
                <p className="font-heading font-600 text-[11px] text-[#5A6272] uppercase tracking-[0.2em] mb-6">
                  {guest.role}
                </p>

                {/* Bio — separate breathing block */}
                <p className="font-heading text-sm text-[#8A94A6] leading-relaxed mb-7">{guest.bio}</p>

                {/* Works — visually separated */}
                <div className="pt-6 border-t border-[rgba(255,255,255,0.05)] mb-6 flex-1">
                  <p className="font-heading font-700 text-[11px] text-[#20CD5C] uppercase tracking-[0.25em] mb-3">
                    Principais Trabalhos
                  </p>
                  <ul className="space-y-2">
                    {guest.works.slice(0, 4).map((w) => (
                      <li key={w} className="font-heading text-xs text-[#8A94A6] flex items-start gap-2.5 leading-relaxed">
                        <span className="text-[#20CD5C] mt-0.5 flex-shrink-0">›</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Socials */}
                <div className="flex items-center gap-4 pt-5 border-t border-[rgba(255,255,255,0.06)]">
                  {guest.socials.instagram && (
                    <span className="flex items-center gap-1.5 text-[#5A6272] hover:text-[#20CD5C] transition-colors cursor-pointer">
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <span className="font-heading text-[11px]">Instagram</span>
                    </span>
                  )}
                  {guest.socials.tiktok && (
                    <span className="flex items-center gap-1.5 text-[#5A6272] hover:text-[#20CD5C] transition-colors cursor-pointer">
                      <TikTokIcon className="w-3.5 h-3.5" />
                      <span className="font-heading text-[11px]">TikTok</span>
                    </span>
                  )}
                  {guest.socials.youtube && (
                    <span className="flex items-center gap-1.5 text-[#5A6272] hover:text-[#20CD5C] transition-colors cursor-pointer">
                      <YoutubeIcon className="w-3.5 h-3.5" />
                      <span className="font-heading text-[11px]">YouTube</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Meet & Greet callout — clear separation from cards */}
        <div className="mt-16 glass-green clip-corner p-8 sm:p-12 text-center">
          <div className="text-4xl mb-4">📸</div>
          <h3 className="font-display text-4xl lg:text-5xl text-white mb-3 leading-none">MEET & GREET OFICIAL</h3>
          <p className="font-heading text-sm text-[#D1D5DB] max-w-lg mx-auto leading-relaxed">
            Ingressos VIP incluem acesso ao Meet & Greet com os convidados especiais.
            Fotos, autógrafos e interação exclusiva às{" "}
            <strong className="text-[#20CD5C]">18h00</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
