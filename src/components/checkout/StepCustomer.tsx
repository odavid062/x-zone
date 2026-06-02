"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { CustomerData } from "./CheckoutFlow";
import { cn } from "@/lib/utils";

const schema = z.object({
  name:  z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  cpf:   z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, "CPF inválido"),
  phone: z.string().min(10, "Telefone inválido").optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

function maskCPF(v: string): string {
  return v.replace(/\D/g,"").slice(0,11)
    .replace(/(\d{3})(\d)/,"$1.$2")
    .replace(/(\d{3})(\d)/,"$1.$2")
    .replace(/(\d{3})(\d{1,2})$/,"$1-$2");
}

function maskPhone(v: string): string {
  return v.replace(/\D/g,"").slice(0,11)
    .replace(/(\d{2})(\d)/,"($1) $2")
    .replace(/(\d{5})(\d{4})$/,"$1-$2")
    .replace(/(\d{4})(\d{4})$/,"$1-$2");
}

interface Props {
  customer: CustomerData | null;
  onBack: () => void;
  onNext: (data: CustomerData) => void;
}

export default function StepCustomer({ customer, onBack, onNext }: Props) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: customer ?? {},
  });

  const onSubmit = (data: FormData) => {
    onNext({ name: data.name, email: data.email, cpf: data.cpf, phone: data.phone ?? "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-2xl mb-1">Seus Dados</h2>
        <p className="text-[#6B7280] text-sm">O ingresso será enviado para o e-mail informado.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] font-heading mb-2">
            Nome completo *
          </label>
          <input
            {...register("name")}
            placeholder="Seu nome completo"
            className={cn(
              "w-full bg-[#111111] border text-white text-sm px-4 py-3 clip-corner-sm placeholder-[#4B5563] focus:outline-none transition-colors",
              errors.name ? "border-red-500" : "border-[#1F1F1F] focus:border-[#20CD5C]"
            )}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] font-heading mb-2">
            E-mail *
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="seu@email.com"
            className={cn(
              "w-full bg-[#111111] border text-white text-sm px-4 py-3 clip-corner-sm placeholder-[#4B5563] focus:outline-none transition-colors",
              errors.email ? "border-red-500" : "border-[#1F1F1F] focus:border-[#20CD5C]"
            )}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* CPF */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] font-heading mb-2">
            CPF *
          </label>
          <input
            value={watch("cpf") ?? ""}
            onChange={(e) => setValue("cpf", maskCPF(e.target.value), { shouldValidate: true })}
            placeholder="000.000.000-00"
            className={cn(
              "w-full bg-[#111111] border text-white text-sm px-4 py-3 clip-corner-sm placeholder-[#4B5563] focus:outline-none transition-colors",
              errors.cpf ? "border-red-500" : "border-[#1F1F1F] focus:border-[#20CD5C]"
            )}
          />
          {errors.cpf && <p className="text-red-400 text-xs mt-1">{errors.cpf.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] font-heading mb-2">
            Telefone (opcional)
          </label>
          <input
            value={watch("phone") ?? ""}
            onChange={(e) => setValue("phone", maskPhone(e.target.value))}
            placeholder="(62) 99999-9999"
            className="w-full bg-[#111111] border border-[#1F1F1F] text-white text-sm px-4 py-3 clip-corner-sm placeholder-[#4B5563] focus:border-[#20CD5C] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Privacy */}
      <p className="text-[#4B5563] text-xs">
        Seus dados são protegidos por criptografia SSL e tratados conforme a{" "}
        <a href="/politica-privacidade" className="text-[#20CD5C] hover:underline">LGPD</a>.
      </p>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="ghost" size="lg" type="button" onClick={onBack} className="flex-shrink-0">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button size="lg" type="submit" className="flex-1">
          Continuar
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
