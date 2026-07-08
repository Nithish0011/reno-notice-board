import { FieldError } from "./Input";

// ============================================================
// Textarea — Reno ERP multi-line input
// ============================================================

export default function Textarea({ label, id, name, error, hint, required, rows = 5, className = "", ...props }) {
  const textareaId = id || name;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-semibold text-slate-700 flex items-center gap-1">
          {label}
          {required && <span style={{ color: "#EF4444" }}>*</span>}
          {hint && <span className="text-xs font-normal text-slate-400 ml-1">({hint})</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        className={["reno-input resize-none", error ? "error" : "", className].filter(Boolean).join(" ")}
        style={{ lineHeight: "1.7" }}
        {...props}
      />

      {error && <FieldError message={error} />}
    </div>
  );
}
