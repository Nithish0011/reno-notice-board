// ============================================================
// Button — Reno ERP premium button component
// ============================================================

const VARIANTS = {
  primary: {
    base: "text-white font-semibold shadow-sm",
    style: {
      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
      boxShadow: "0 1px 3px rgb(37 99 235 / 0.4), inset 0 1px 0 rgb(255 255 255 / 0.15)",
    },
    hover: "hover:opacity-90 active:opacity-100 active:scale-[0.98]",
  },
  secondary: {
    base: "bg-white text-slate-700 font-medium border border-slate-200 shadow-xs",
    style: {},
    hover: "hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 active:scale-[0.98]",
  },
  danger: {
    base: "text-white font-semibold shadow-sm",
    style: {
      background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
      boxShadow: "0 1px 3px rgb(239 68 68 / 0.4)",
    },
    hover: "hover:opacity-90 active:opacity-100 active:scale-[0.98]",
  },
  ghost: {
    base: "bg-transparent text-slate-500 font-medium",
    style: {},
    hover: "hover:bg-slate-100 hover:text-slate-800 active:bg-slate-200",
  },
};

const SIZES = {
  sm: "h-8  px-3   text-xs  gap-1.5 rounded-lg",
  md: "h-9  px-4   text-sm  gap-2   rounded-lg",
  lg: "h-10 px-5   text-sm  gap-2   rounded-xl",
  xl: "h-11 px-6   text-base gap-2.5 rounded-xl",
};

export default function Button({
  children, variant = "primary", size = "md",
  loading = false, disabled = false,
  icon, type = "button", onClick,
  className = "", style = {}, ...props
}) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...v.style, ...style }}
      className={[
        "inline-flex items-center justify-center",
        "transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        v.base,
        v.hover,
        s,
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          <span>{children}</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0 flex">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
