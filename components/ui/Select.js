import { FieldError } from "./Input";

// ============================================================
// Select — Reno ERP styled dropdown
// ============================================================

export default function Select({ label, id, name, error, hint, required, children, className = "", ...props }) {
  const selectId = id || name;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold text-slate-700 flex items-center gap-1">
          {label}
          {required && <span style={{ color: "#EF4444" }}>*</span>}
          {hint && <span className="text-xs font-normal text-slate-400 ml-1">({hint})</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          name={name}
          className={["reno-input appearance-none pr-9", error ? "error" : "", className].filter(Boolean).join(" ")}
          {...props}
        >
          {children}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {error && <FieldError message={error} />}
    </div>
  );
}
