// ============================================================
// Spinner — Reno ERP loading indicator
// ============================================================

const SIZES = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-9 w-9",
  xl: "h-12 w-12",
};

const THICKNESS = {
  sm: "border-2",
  md: "border-2",
  lg: "border-[3px]",
  xl: "border-4",
};

export default function Spinner({ size = "md", className = "" }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={[
        "rounded-full animate-spin",
        "border-slate-200 border-t-blue-600",
        SIZES[size] ?? SIZES.md,
        THICKNESS[size] ?? THICKNESS.md,
        className,
      ].join(" ")}
    />
  );
}
