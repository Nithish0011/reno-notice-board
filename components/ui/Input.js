// ============================================================
// Input — Reno ERP premium text field
// ============================================================

export default function Input({ label, id, name, error, hint, required, className = "", ...props }) {
  const inputId = id || name;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-slate-700 flex items-center gap-1">
          {label}
          {required && <span style={{ color: "#EF4444" }}>*</span>}
          {hint && <span className="text-xs font-normal text-slate-400 ml-1">({hint})</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        className={["reno-input", error ? "error" : "", className].filter(Boolean).join(" ")}
        {...props}
      />

      {error && <FieldError message={error} />}
    </div>
  );
}

export function FieldError({ message }) {
  return (
    <p className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#DC2626" }} role="alert">
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {message}
    </p>
  );
}
