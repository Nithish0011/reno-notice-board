// ============================================================
// Badge — Reno ERP status pill
// ============================================================

const STYLES = {
  blue:   { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE", dot: "#3B82F6" },
  green:  { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0", dot: "#22C55E" },
  red:    { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA", dot: "#EF4444" },
  yellow: { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A", dot: "#F59E0B" },
  gray:   { bg: "#F8FAFC", text: "#475569", border: "#E2E8F0", dot: "#94A3B8" },
  purple: { bg: "#F5F3FF", text: "#6D28D9", border: "#DDD6FE", dot: "#8B5CF6" },
};

export default function Badge({ children, variant = "gray", dot = false, className = "" }) {
  const s = STYLES[variant] ?? STYLES.gray;

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5",
        "text-xs font-semibold tracking-wide",
        className,
      ].join(" ")}
      style={{
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
      }}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full shrink-0"
          style={{ background: s.dot }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
