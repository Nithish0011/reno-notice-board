import Link from "next/link";
import Button from "./ui/Button";

// ============================================================
// EmptyState — premium zero-data illustration
// ============================================================

export default function EmptyState({
  title       = "No notices yet",
  description = "Create your first notice to get started.",
  actionLabel = "Create Notice",
  actionHref  = "/add",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
      {/* Illustration */}
      <div className="relative">
        <div
          className="flex items-center justify-center w-24 h-24 rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)",
            border: "1.5px solid #BFDBFE",
            boxShadow: "0 8px 24px rgb(37 99 235 / 0.08)",
          }}
        >
          <svg className="w-11 h-11" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 12h6M9 16h4" />
          </svg>
        </div>
        {/* Floating dots */}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-400 opacity-60" />
        <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-purple-400 opacity-50" />
      </div>

      <div className="space-y-2 max-w-sm">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>

      {actionHref && (
        <Link href={actionHref}>
          <Button
            variant="primary"
            size="lg"
            icon={
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            }
          >
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
