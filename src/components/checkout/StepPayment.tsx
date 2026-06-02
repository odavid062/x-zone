"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, CreditCard, QrCode, Copy, Check, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { CartItem, CustomerData, OrderData } from "./CheckoutFlow";
import { formatCurrency, cn } from "@/lib/utils";

interface Props {
  cart: CartItem[];
  customer: CustomerData;
  coupon: { code: string; discount: number } | null;
  total: number;
  onBack: () => void;
  onSuccess: (order: OrderData) => void;
}

type Method = "pix" | "credit_card";

type CardData = {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  installments: number;
};

function maskCard(v: string) {
  return v.replace(/\D/g,"").slice(0,16).replace(/(\d{4})/g,"$1 ").trim();
}
function maskExpiry(v: string) {
  return v.replace(/\D/g,"").slice(0,4).replace(/(\d{2})(\d{1,2})/,"$1/$2");
}

export default function StepPayment({ cart, customer, coupon, total, onBack, onSuccess }: Props) {
  const [method, setMethod] = useState<Method>("pix");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pixData, setPixData] = useState<{ qrCode: string; copyPaste: string; orderId: string; orderNumber: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [polling, setPolling] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const [card, setCard] = useState<CardData>({ number: "", name: "", expiry: "", cvv: "", installments: 1 });

  useEffect(() => {
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, []);

  const createOrder = async (paymentMethod: Method, cardData?: CardData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          customer,
          couponCode: coupon?.code,
          paymentMethod,
          cardData: paymentMethod === "credit_card" ? cardData : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao processar pagamento");

      if (paymentMethod === "pix") {
        setPixData({
          qrCode:      data.pixQrCode,
          copyPaste:   data.pixCopyCola,
          orderId:     data.orderId,
          orderNumber: data.orderNumber,
        });
        // Start polling
        setPolling(true);
        pollingRef.current = setInterval(async () => {
          const check = await fetch(`/api/orders/${data.orderId}/status`);
          const status = await check.json();
          if (status.paid) {
            clearInterval(pollingRef.current!);
            setPolling(false);
            onSuccess({ orderId: data.orderId, orderNumber: data.orderNumber, total, paymentMethod: "pix" });
          }
        }, 3000);
      } else {
        onSuccess({ orderId: data.orderId, orderNumber: data.orderNumber, total, paymentMethod: "credit_card" });
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const copyPix = () => {
    if (pixData?.copyPaste) {
      navigator.clipboard.writeText(pixData.copyPaste);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const installmentOptions = [1, 2, 3].map((n) => ({
    n,
    value: total / n,
    label: n === 1 ? `1× de ${formatCurrency(total)} (à vista)` : `${n}× de ${formatCurrency(total / n)}`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-2xl mb-1">Pagamento</h2>
        <p className="text-[#6B7280] text-sm">
          Total: <strong className="text-[#20CD5C]">{formatCurrency(total)}</strong>
        </p>
      </div>

      {!pixData && (
        <>
          {/* Method selector */}
          <div className="grid grid-cols-2 gap-3">
            {(["pix", "credit_card"] as Method[]).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 clip-corner border transition-all",
                  method === m
                    ? "border-[#20CD5C] bg-[#20CD5C]/5 text-[#20CD5C]"
                    : "border-[#1F1F1F] bg-[#111111] text-[#6B7280] hover:border-[#20CD5C]/50"
                )}
              >
                {m === "pix" ? <QrCode className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}
                <span className="text-xs font-bold uppercase tracking-wider font-heading">
                  {m === "pix" ? "PIX" : "Cartão de Crédito"}
                </span>
                {m === "pix" && (
                  <span className="text-[10px] text-[#20CD5C] bg-[#20CD5C]/10 px-2 py-0.5 clip-corner-sm">
                    Aprovação imediata
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* PIX info */}
          {method === "pix" && (
            <div className="bg-[#111111] border border-[#1F1F1F] clip-corner p-4 space-y-2">
              <p className="text-sm text-[#9CA3AF]">
                Após clicar em <strong className="text-white">Gerar PIX</strong>, um QR Code será gerado.
                O pagamento é confirmado automaticamente em segundos.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#20CD5C]">
                <Check className="w-3.5 h-3.5" />
                <span>Sem taxas adicionais</span>
              </div>
            </div>
          )}

          {/* Card form */}
          {method === "credit_card" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] font-heading mb-2">Número do Cartão</label>
                <input
                  value={card.number}
                  onChange={(e) => setCard((c) => ({ ...c, number: maskCard(e.target.value) }))}
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-[#111111] border border-[#1F1F1F] text-white text-sm px-4 py-3 clip-corner-sm placeholder-[#4B5563] focus:border-[#20CD5C] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] font-heading mb-2">Nome no Cartão</label>
                <input
                  value={card.name}
                  onChange={(e) => setCard((c) => ({ ...c, name: e.target.value.toUpperCase() }))}
                  placeholder="NOME COMO NO CARTÃO"
                  className="w-full bg-[#111111] border border-[#1F1F1F] text-white text-sm px-4 py-3 clip-corner-sm placeholder-[#4B5563] focus:border-[#20CD5C] focus:outline-none transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] font-heading mb-2">Validade</label>
                  <input
                    value={card.expiry}
                    onChange={(e) => setCard((c) => ({ ...c, expiry: maskExpiry(e.target.value) }))}
                    placeholder="MM/AA"
                    className="w-full bg-[#111111] border border-[#1F1F1F] text-white text-sm px-4 py-3 clip-corner-sm placeholder-[#4B5563] focus:border-[#20CD5C] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] font-heading mb-2">CVV</label>
                  <input
                    value={card.cvv}
                    onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value.replace(/\D/g,"").slice(0,4) }))}
                    placeholder="000"
                    type="password"
                    className="w-full bg-[#111111] border border-[#1F1F1F] text-white text-sm px-4 py-3 clip-corner-sm placeholder-[#4B5563] focus:border-[#20CD5C] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] font-heading mb-2">Parcelamento</label>
                <select
                  value={card.installments}
                  onChange={(e) => setCard((c) => ({ ...c, installments: Number(e.target.value) }))}
                  className="w-full bg-[#111111] border border-[#1F1F1F] text-white text-sm px-4 py-3 clip-corner-sm focus:border-[#20CD5C] focus:outline-none transition-colors"
                >
                  {installmentOptions.map((opt) => (
                    <option key={opt.n} value={opt.n}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 p-3 clip-corner-sm">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <Button variant="ghost" size="lg" type="button" onClick={onBack} className="flex-shrink-0">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              className="flex-1"
              loading={loading}
              onClick={() => createOrder(method, method === "credit_card" ? card : undefined)}
            >
              {method === "pix" ? (
                <><QrCode className="w-4 h-4" /> Gerar PIX</>
              ) : (
                <><CreditCard className="w-4 h-4" /> Pagar {formatCurrency(total)}</>
              )}
            </Button>
          </div>
        </>
      )}

      {/* PIX QR Code display */}
      {pixData && (
        <div className="space-y-6">
          <div className="bg-[#111111] border border-[#20CD5C]/40 clip-corner p-6 text-center">
            <div className="w-6 h-6 bg-[#20CD5C] clip-corner-sm flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-4 h-4 text-black" />
            </div>
            <h3 className="font-display font-black text-white text-lg mb-1">PIX gerado!</h3>
            <p className="text-[#6B7280] text-sm mb-4">
              Escaneie o QR Code ou copie o código PIX
            </p>

            {/* QR Code placeholder - in production render actual QR */}
            <div className="w-48 h-48 bg-white mx-auto mb-4 flex items-center justify-center clip-corner-sm">
              <div className="text-black text-xs text-center p-2">
                <QrCode className="w-16 h-16 mx-auto mb-1" />
                <span>QR Code PIX</span>
              </div>
            </div>

            <button
              onClick={copyPix}
              className="w-full flex items-center justify-center gap-2 bg-black border border-[#1F1F1F] hover:border-[#20CD5C] text-sm text-[#9CA3AF] hover:text-[#20CD5C] py-3 clip-corner-sm transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-[#20CD5C]" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado!" : "Copiar código PIX"}
            </button>
          </div>

          {polling && (
            <div className="flex items-center justify-center gap-3 text-sm text-[#6B7280]">
              <RefreshCw className="w-4 h-4 animate-spin text-[#20CD5C]" />
              <span>Aguardando confirmação do pagamento...</span>
            </div>
          )}

          <p className="text-[#4B5563] text-xs text-center">
            O PIX expira em <strong className="text-[#6B7280]">30 minutos</strong>.
            Após o pagamento, seu ingresso será enviado automaticamente por e-mail.
          </p>
        </div>
      )}
    </div>
  );
}
