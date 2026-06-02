import Link from "next/link";
import { Zap } from "lucide-react";
import { EVENT } from "@/lib/constants";

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

const navLinks = [
  { href: "#sobre",       label: "Sobre o Evento" },
  { href: "#programacao", label: "Programação" },
  { href: "#convidados",  label: "Convidados" },
  { href: "#ingressos",   label: "Ingressos" },
  { href: "#faq",         label: "Perguntas Frequentes" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Glow line top */}
      <div className="glow-line" />

      {/* Ticker — fiel ao media kit */}
      <div className="bg-[#20CD5C] py-2.5 overflow-hidden">
        <div className="animate-ticker whitespace-nowrap inline-flex gap-16 select-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-display text-sm text-black tracking-widest">
              X-ZONE 2026 &middot; 05 SET &middot; GOIÂNIA &middot; O MAIOR EVENTO GAMER E GEEK DA REGIÃO &middot;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#030303] border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Brand */}
            <div className="space-y-5">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-[#20CD5C] clip-corner-sm flex items-center justify-center">
                  <Zap className="w-5 h-5 text-black" fill="black" strokeWidth={0} />
                </div>
                <span className="font-display text-2xl text-white">
                  X<span className="text-[#20CD5C]">-</span>ZONE
                </span>
              </Link>
              <p className="font-heading text-sm text-[#5A6272] leading-relaxed max-w-xs">
                O maior evento imersivo de games, esports e cultura geek de Goiânia.
                Competição, cultura e entretenimento em um único ambiente.
              </p>
              <div className="flex items-center gap-3">
                {[InstagramIcon, TikTokIcon, YoutubeIcon].map((Icon, i) => (
                  <a key={i} href="#" className="glass-pill clip-corner-sm w-9 h-9 flex items-center justify-center text-[#5A6272] hover:text-[#20CD5C] hover:border-[rgba(32,205,92,0.4)] transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-display text-xl text-white mb-6">NAVEGAÇÃO</h4>
              <ul className="space-y-3">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="font-heading text-sm text-[#5A6272] hover:text-[#20CD5C] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Event info */}
            <div>
              <h4 className="font-display text-xl text-white mb-6">INFORMAÇÕES</h4>
              <div className="space-y-3 font-heading text-sm">
                {[
                  { label: "Data",     value: EVENT.date },
                  { label: "Horário",  value: EVENT.time },
                  { label: "Local",    value: EVENT.location },
                  { label: "Contato",  value: "contato@xzone2026.com.br", href: "mailto:contato@xzone2026.com.br" },
                ].map((item) => (
                  <div key={item.label}>
                    <span className="text-[#20CD5C] font-700 block text-[11px] uppercase tracking-[0.2em] mb-0.5">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="text-[#5A6272] hover:text-[#20CD5C] transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-[#8A94A6]">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-14 pt-6 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row justify-between items-center gap-4 font-heading text-xs text-[#3A3F4A]">
            <p>© 2026 X-Zone. Todos os direitos reservados.</p>
            <div className="flex gap-5">
              <Link href="/politica-privacidade" className="hover:text-[#20CD5C] transition-colors">Política de Privacidade</Link>
              <Link href="/termos" className="hover:text-[#20CD5C] transition-colors">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
