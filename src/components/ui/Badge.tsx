import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "lime" | "yellow" | "outline";
  className?: string;
}

export default function Badge({ children, variant = "outline", className }: BadgeProps) {
  const variants = {
    green:   "bg-[#20CD5C] text-black",
    lime:    "bg-[#B3F54E] text-black",
    yellow:  "bg-[#D0FA40] text-black",
    outline: "border border-[#20CD5C] text-[#20CD5C] bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-widest clip-corner-sm",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
