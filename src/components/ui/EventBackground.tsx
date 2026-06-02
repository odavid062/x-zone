export default function EventBackground({ variant = "default" }: { variant?: "default" | "dark" | "mid" }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base hex pattern */}
      <div className="absolute inset-0 bg-hex opacity-100" />

      {/* Circuit traces nos cantos — fiel ao media kit */}
      <div className="absolute inset-0 bg-circuit opacity-60" />

      {/* Orb verde superior esquerdo */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(32,205,92,0.12) 0%, transparent 65%)" }} />

      {/* Orb verde inferior direito */}
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(32,205,92,0.09) 0%, transparent 65%)" }} />

      {/* Faixa central de luz — idêntico ao media kit */}
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(32,205,92,0.15) 30%, rgba(32,205,92,0.4) 50%, rgba(32,205,92,0.15) 70%, transparent 100%)",
          boxShadow: "0 0 40px rgba(32,205,92,0.2)",
        }} />

      {/* Overlay escuro para contraste do texto */}
      {variant !== "default" && (
        <div className="absolute inset-0"
          style={{ background: variant === "dark" ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)" }} />
      )}
    </div>
  );
}
