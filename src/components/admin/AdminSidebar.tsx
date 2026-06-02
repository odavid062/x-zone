"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Ticket, Users, CreditCard,
  Tag, Calendar, BarChart3, Settings, Zap, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin",              icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/ingressos",    icon: Ticket,          label: "Ingressos" },
  { href: "/admin/participantes",icon: Users,           label: "Participantes" },
  { href: "/admin/pagamentos",   icon: CreditCard,      label: "Pagamentos" },
  { href: "/admin/cupons",       icon: Tag,             label: "Cupons" },
  { href: "/admin/programacao",  icon: Calendar,        label: "Programação" },
  { href: "/admin/relatorios",   icon: BarChart3,       label: "Relatórios" },
  { href: "/admin/configuracoes",icon: Settings,        label: "Configurações" },
];

export default function AdminSidebar() {
  const path = usePathname();

  return (
    <aside className="w-56 bg-black border-r border-[#1F1F1F] flex flex-col h-full flex-shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-[#1F1F1F]">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#20CD5C] clip-corner-sm flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" fill="black" />
          </div>
          <div>
            <span className="font-display font-black text-sm text-white">X-ZONE</span>
            <span className="block text-[10px] text-[#6B7280] font-heading uppercase tracking-wider -mt-0.5">Admin</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {links.map((l) => {
          const active = path === l.href || (l.href !== "/admin" && path.startsWith(l.href));
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-sm font-heading font-medium transition-all mx-2 clip-corner-sm mb-0.5",
                active
                  ? "bg-[#20CD5C]/10 text-[#20CD5C] border-l-2 border-[#20CD5C]"
                  : "text-[#6B7280] hover:text-white hover:bg-[#111111]"
              )}
            >
              <l.icon className="w-4 h-4 flex-shrink-0" />
              {l.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#1F1F1F]">
        <button className="flex items-center gap-3 text-[#6B7280] hover:text-red-400 text-sm font-heading transition-colors w-full">
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
