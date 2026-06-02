"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import LinkButton from "@/components/ui/LinkButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#sobre",       label: "Sobre" },
  { href: "#programacao", label: "Programação" },
  { href: "#convidados",  label: "Convidados" },
  { href: "#ingressos",   label: "Ingressos" },
  { href: "#faq",         label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-nav border-b border-[rgba(32,205,92,0.15)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#20CD5C] clip-corner-sm flex items-center justify-center group-hover:shadow-[0_0_25px_#20CD5C] transition-shadow duration-300">
              <Zap className="w-5 h-5 text-black" fill="black" strokeWidth={0} />
            </div>
            <span className="font-display text-2xl text-white leading-none group-hover:text-[#20CD5C] transition-colors">
              X<span className="text-[#20CD5C]">-</span>ZONE
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-heading font-600 text-xs text-[#8A94A6] hover:text-[#20CD5C] transition-colors uppercase tracking-[0.15em]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-[11px] text-[#5A6272] font-heading uppercase tracking-[0.2em]">
              05 SET 2026 · GOIÂNIA
            </span>
            <LinkButton href="/ingressos" size="sm">
              Comprar Ingresso
            </LinkButton>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#8A94A6] hover:text-[#20CD5C] transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — liquid glass */}
      {mobileOpen && (
        <div className="lg:hidden glass-modal border-t border-[rgba(32,205,92,0.1)]">
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-heading font-600 text-sm text-[#8A94A6] hover:text-[#20CD5C] uppercase tracking-[0.15em] py-3 border-b border-[rgba(255,255,255,0.04)] transition-colors last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <LinkButton
              href="/ingressos"
              size="lg"
              className="mt-5 w-full justify-center"
              onClick={() => setMobileOpen(false)}
            >
              Comprar Ingresso
            </LinkButton>
          </nav>
        </div>
      )}
    </header>
  );
}
