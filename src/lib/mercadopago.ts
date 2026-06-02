import MercadoPagoConfig, { Payment } from "mercadopago";

function getMpClient() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurado");
  return new MercadoPagoConfig({ accessToken: token });
}

export function getMpPayment() {
  return new Payment(getMpClient());
}

export interface CreatePixPaymentInput {
  orderId: string;
  orderNumber: string;
  amount: number;
  payerEmail: string;
  payerName: string;
  payerCpf: string;
  description: string;
}

export interface CreateCardPaymentInput {
  orderId: string;
  orderNumber: string;
  amount: number;
  payerEmail: string;
  payerName: string;
  payerCpf: string;
  cardToken: string;
  installments: number;
  description: string;
}

export async function createPixPayment(input: CreatePixPaymentInput) {
  const payment = getMpPayment();
  const result = await payment.create({
    body: {
      transaction_amount: input.amount,
      description: input.description,
      payment_method_id: "pix",
      payer: {
        email: input.payerEmail,
        first_name: input.payerName.split(" ")[0],
        last_name:  input.payerName.split(" ").slice(1).join(" "),
        identification: { type: "CPF", number: input.payerCpf.replace(/\D/g, "") },
      },
      external_reference: input.orderNumber,
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/mercadopago`,
    },
  });

  return {
    paymentId:   String(result.id),
    status:      result.status,
    pixQrCode:   result.point_of_interaction?.transaction_data?.qr_code_base64 ?? "",
    pixCopyCola: result.point_of_interaction?.transaction_data?.qr_code ?? "",
    expiresAt:   result.date_of_expiration,
  };
}

export async function createCardPayment(input: CreateCardPaymentInput) {
  const payment = getMpPayment();
  const result = await payment.create({
    body: {
      transaction_amount: input.amount,
      description: input.description,
      token: input.cardToken,
      installments: input.installments,
      payer: {
        email: input.payerEmail,
        identification: { type: "CPF", number: input.payerCpf.replace(/\D/g, "") },
      },
      external_reference: input.orderNumber,
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/mercadopago`,
    },
  });

  return {
    paymentId: String(result.id),
    status:    result.status,
    approved:  result.status === "approved",
  };
}

export async function getPaymentStatus(paymentId: string) {
  const payment = getMpPayment();
  const result  = await payment.get({ id: Number(paymentId) });
  return { status: result.status, paid: result.status === "approved" };
}
