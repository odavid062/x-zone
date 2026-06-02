import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
  size?: "md" | "lg" | "xl";
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  highlight,
  description,
  centered = true,
  size = "lg",
  className,
}: SectionTitleProps) {
  const sizeClass = {
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-6xl lg:text-7xl",
    xl: "text-6xl md:text-8xl lg:text-9xl",
  }[size];

  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow && (
        <div className="mb-5">
          <div className="glow-line max-w-[120px] mx-auto mb-4" />
          <p className={cn(
            "font-heading font-700 text-[11px] uppercase tracking-[0.4em] text-[#20CD5C]",
            centered && "text-center"
          )}>
            {eyebrow}
          </p>
        </div>
      )}

      <h2 className={cn(
        "section-title font-display leading-none tracking-wide text-white mb-0",
        sizeClass
      )}>
        {title}
        {highlight && (
          <span className="text-gradient-green neon-text-green">{highlight}</span>
        )}
      </h2>

      {description && (
        <p className={cn(
          "font-heading text-sm md:text-base text-[#8A94A6] leading-relaxed mt-5",
          centered && "max-w-xl mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
