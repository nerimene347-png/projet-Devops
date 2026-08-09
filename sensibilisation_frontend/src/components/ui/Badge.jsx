const STYLES = {
  bleu: "bg-primary-100 text-primary-700",
  orange: "bg-accent-100 text-accent-600",
  vert: "bg-emerald-100 text-emerald-700",
  gris: "bg-slate-100 text-slate-600",
  rouge: "bg-red-100 text-red-600",
};

export default function Badge({ children, color = "bleu", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[color]} ${className}`}
    >
      {children}
    </span>
  );
}
