import { Metadata } from "next";
import { TrendingUp, Ticket, Users, DollarSign, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export const dynamic = "force-dynamic";

async function getStats() {
  const [ordersResult, ticketsResult] = await Promise.all([
    supabaseAdmin.from("orders").select("status, total, paid_at, created_at"),
    supabaseAdmin.from("tickets").select("id"),
  ]);

  const orders = ordersResult.data ?? [];
  const totalRevenue    = orders.filter((o) => o.status === "paid").reduce((s, o) => s + (o.total ?? 0), 0);
  const totalTickets    = ticketsResult.data?.length ?? 0;
  const pendingOrders   = orders.filter((o) => o.status === "pending").length;
  const approvedOrders  = orders.filter((o) => o.status === "paid").length;
  const cancelledOrders = orders.filter((o) => o.status === "cancelled").length;

  return { totalRevenue, totalTickets, pendingOrders, approvedOrders, cancelledOrders, totalOrders: orders.length };
}

async function getRecentOrders() {
  const { data } = await supabaseAdmin
    .from("orders")
    .select("id, order_number, customer_name, customer_email, total, status, payment_method, created_at")
    .order("created_at", { ascending: false })
    .limit(10);
  return data ?? [];
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  paid:      { label: "Pago",      color: "text-[#20CD5C] bg-[#20CD5C]/10", icon: CheckCircle },
  pending:   { label: "Pendente",  color: "text-yellow-400 bg-yellow-400/10", icon: Clock },
  cancelled: { label: "Cancelado", color: "text-red-400 bg-red-400/10",      icon: XCircle },
  failed:    { label: "Falhou",    color: "text-red-400 bg-red-400/10",       icon: AlertCircle },
};

export default async function AdminDashboard() {
  const [stats, orders] = await Promise.all([getStats(), getRecentOrders()]);

  const statCards = [
    { label: "Receita Total",     value: formatCurrency(stats.totalRevenue),  icon: DollarSign, color: "#20CD5C" },
    { label: "Ingressos Vendidos",value: String(stats.totalTickets),           icon: Ticket,     color: "#B3F54E" },
    { label: "Pedidos Aprovados", value: String(stats.approvedOrders),         icon: CheckCircle,color: "#D0FA40" },
    { label: "Pedidos Pendentes", value: String(stats.pendingOrders),          icon: Clock,      color: "#F59E0B" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-white text-2xl">Dashboard</h1>
        <p className="text-[#6B7280] text-sm mt-1">Visão geral do evento X-Zone 2026</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-[#111111] border border-[#1F1F1F] clip-corner p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 clip-corner-sm flex items-center justify-center" style={{ background: `${card.color}20` }}>
                <card.icon className="w-4 h-4" style={{ color: card.color }} />
              </div>
              <TrendingUp className="w-4 h-4 text-[#20CD5C]" />
            </div>
            <div className="font-display font-black text-2xl text-white mb-1">{card.value}</div>
            <div className="text-[#6B7280] text-xs font-heading uppercase tracking-wider">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-[#111111] border border-[#1F1F1F] clip-corner">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F1F]">
          <h2 className="font-display font-black text-white text-sm uppercase tracking-wider">
            Pedidos Recentes
          </h2>
          <a href="/admin/pagamentos" className="text-[#20CD5C] text-xs hover:text-[#B3F54E] transition-colors font-heading font-bold uppercase tracking-wider">
            Ver todos →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1F1F1F]">
                {["Pedido", "Cliente", "Método", "Total", "Status", "Data"].map((h) => (
                  <th key={h} className="text-left text-xs font-bold uppercase tracking-wider text-[#6B7280] font-heading px-6 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const sc = statusConfig[order.status] ?? statusConfig.pending;
                const Icon = sc.icon;
                return (
                  <tr key={order.id} className="border-b border-[#1F1F1F]/50 hover:bg-[#111111]/80 transition-colors">
                    <td className="px-6 py-4 font-heading font-bold text-[#20CD5C] text-xs">{order.order_number}</td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{order.customer_name}</div>
                      <div className="text-[#6B7280] text-xs">{order.customer_email}</div>
                    </td>
                    <td className="px-6 py-4 text-[#9CA3AF] uppercase text-xs font-heading">
                      {order.payment_method === "pix" ? "PIX" : "Cartão"}
                    </td>
                    <td className="px-6 py-4 font-display font-black text-white tabular-nums">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 clip-corner-sm font-heading uppercase tracking-wide ${sc.color}`}>
                        <Icon className="w-3 h-3" />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#6B7280] text-xs">
                      {new Date(order.created_at).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#6B7280] text-sm">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
