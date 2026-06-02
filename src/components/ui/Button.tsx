"use client";

import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
}

export const buttonStyles = (
  variant: ButtonProps["variant"] = "primary",
  size: ButtonProps["size"] = "md",
  className?: string
) => {
  const base =
    "inline-flex items-center justify-center font-heading font-700 tracking-wide uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#20CD5C] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-40 disabled:cursor-not-allowed clip-corner-sm cursor-pointer select-none";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-[#20CD5C] text-black hover:bg-[#B3F54E] font-bold hover:shadow-[0_0_30px_rgba(32,205,92,0.6)] active:scale-[0.97]",
    secondary:
      "bg-[#D0FA40] text-black hover:bg-[#B3F54E] font-bold hover:shadow-[0_0_30px_rgba(208,250,64,0.5)] active:scale-[0.97]",
    outline:
      "border border-[#20CD5C] text-[#20CD5C] bg-transparent hover:bg-[#20CD5C] hover:text-black hover:shadow-[0_0_24px_rgba(32,205,92,0.4)] active:scale-[0.97]",
    ghost:
      "text-[#20CD5C] bg-transparent hover:bg-[rgba(32,205,92,0.1)] active:scale-[0.97]",
    glass:
      "glass-green text-[#20CD5C] font-bold hover:border-[rgba(32,205,92,0.5)] hover:shadow-[0_0_30px_rgba(32,205,92,0.15)] active:scale-[0.97]",
  };

  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-5 py-2.5 text-xs gap-1.5",
    md: "px-7 py-3 text-sm gap-2",
    lg: "px-9 py-4 text-base gap-2",
    xl: "px-12 py-5 text-lg gap-3",
  };

  return cn(base, variants[variant], sizes[size], className);
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={buttonStyles(variant, size, className)}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Carregando...
        </>
      ) : (
        children
      )}
    </button>
  )
);

Button.displayName = "Button";
export default Button;
