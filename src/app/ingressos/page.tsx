import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import { EVENT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Comprar Ingressos",
  description: `Compre seu ingresso para a ${EVENT.fullName}. ${EVENT.date} · ${EVENT.time} · ${EVENT.location}.`,
};

export default function IngressosPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#20CD5C]" />
              <span className="text-[#20CD5C] text-xs font-bold uppercase tracking-[0.3em] font-heading">
                Garanta sua Vaga
              </span>
              <span className="h-px w-8 bg-[#20CD5C]" />
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white mb-3">
              Comprar <span className="text-gradient-green">Ingressos</span>
            </h1>
            <p className="text-[#6B7280] text-sm">
              {EVENT.date} · {EVENT.time} · {EVENT.location}
            </p>
          </div>

          <CheckoutFlow />
        </div>
      </main>
      <Footer />
    </>
  );
}
