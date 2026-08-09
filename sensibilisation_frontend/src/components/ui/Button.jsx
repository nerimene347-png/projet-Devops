const VARIANTS = {
  primary:
    "bg-primary-700 text-white hover:bg-primary-600 shadow-sm shadow-primary-700/20",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 shadow-sm shadow-accent-500/30",
  outline:
    "border border-slate-200 text-slate-700 hover:border-primary-500 hover:text-primary-700 bg-white",
  ghost: "text-slate-600 hover:bg-slate-100",
};

const SIZES = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2.2} />}
      {children}
    </button>
  );
}
