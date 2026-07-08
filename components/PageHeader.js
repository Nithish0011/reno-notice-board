import Link from "next/link";

// ============================================================
// PageHeader — ERP module header with breadcrumb + title + actions
// ============================================================

export default function PageHeader({ breadcrumb, title, subtitle, actions }) {
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      {breadcrumb && (
        <nav className="flex items-center gap-1.5 mb-3" aria-label="Breadcrumb">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg className="h-3 w-3 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-xs font-medium text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-xs font-semibold text-slate-600">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title + actions */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "#0F172A", letterSpacing: "-0.025em" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm" style={{ color: "#64748B" }}>
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
