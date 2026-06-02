import Link from "next/link";
import { type ButtonProps, buttonStyles } from "./Button";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes } from "react";

type LinkButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Pick<ButtonProps, "variant" | "size" | "className"> & {
    href: string;
  };

export default function LinkButton({ href, variant, size, className, children, ...props }: LinkButtonProps) {
  return (
    <Link href={href} className={cn(buttonStyles(variant, size), className)} {...props}>
      {children}
    </Link>
  );
}
