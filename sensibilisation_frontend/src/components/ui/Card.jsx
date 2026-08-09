export default function Card({
  children,
  className = "",
  padded = true,
  ...props
}) {
  return (
    <div
      className={`bg-white rounded-[var(--radius-card)] border border-slate-200 ${padded ? "p-5" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
