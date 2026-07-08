import { useEffect, useState, useCallback } from "react";

// ============================================================
// Toast — success / error / info notification
// ============================================================

const STYLES = {
  success: { bar: "bg-green-500", icon: "bg-green-100 text-green-600", text: "text-green-900", border: "border-green-200" },
  error:   { bar: "bg-red-500",   icon: "bg-red-100   text-red-600",   text: "text-red-900",   border: "border-red-200"   },
  info:    { bar: "bg-blue-500",  icon: "bg-blue-100  text-blue-600",  text: "text-blue-900",  border: "border-blue-200"  },
};

const ICONS = {
  success: <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>,
  error:   <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" /></svg>,
  info:    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" /></svg>,
};

export default function Toast({ message, type = "success", onDismiss, duration = 3500 }) {
  const s = STYLES[type] ?? STYLES.info;

  useEffect(() => {
    const t = setTimeout(() => onDismiss?.(), duration);
    return () => clearTimeout(t);
  }, [onDismiss, duration]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={[
        "relative flex items-start gap-3 w-full max-w-sm",
        "rounded-xl border shadow-lg px-4 py-3 bg-white overflow-hidden",
        s.border,
      ].join(" ")}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.bar}`} aria-hidden="true" />

      {/* Icon */}
      <span className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full ${s.icon}`}>
        {ICONS[type]}
      </span>

      {/* Message */}
      <p className={`flex-1 text-sm font-medium pt-0.5 ${s.text}`}>{message}</p>

      {/* Dismiss */}
      <button
        onClick={onDismiss}
        className="shrink-0 text-slate-400 hover:text-slate-700 transition-colors pt-0.5"
        aria-label="Dismiss notification"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </div>
  );
}

// ============================================================
// ToastContainer
// ============================================================

export function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast message={toast.message} type={toast.type} onDismiss={() => onDismiss(toast.id)} />
        </div>
      ))}
    </div>
  );
}

// ============================================================
// useToast hook
// ============================================================

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, dismissToast };
}
