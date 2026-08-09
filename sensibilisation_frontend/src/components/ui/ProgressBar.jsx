export default function ProgressBar({
  value = 0,
  colorClass = "bg-primary-600",
  trackClass = "bg-slate-200",
  height = "h-2",
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={`w-full ${trackClass} rounded-full ${height} overflow-hidden`}
    >
      <div
        className={`${colorClass} ${height} rounded-full transition-all duration-500`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
