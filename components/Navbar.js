import Link from "next/link";
import { useRouter } from "next/router";

// ============================================================
// Navbar — Reno School ERP application bar
// ============================================================

const NAV_ITEMS = [
  { label: "Dashboard", href: "#",  icon: <DashboardIcon /> },
  { label: "Notices",   href: "/",  icon: <NoticeIcon /> },
  { label: "Students",  href: "#",  icon: <StudentsIcon /> },
  { label: "Teachers",  href: "#",  icon: <TeachersIcon /> },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #E2E8F0",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.06)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Brand ── */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div
                className="flex items-center justify-center h-8 w-8 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  boxShadow: "0 2px 8px rgb(37 99 235 / 0.35)",
                }}
              >
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1.5" />
                  <path d="M9 12h6M9 16h4" />
                </svg>
              </div>
              <div className="leading-none">
                <p className="text-sm font-bold text-slate-900 tracking-tight">Reno ERP</p>
                <p className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5">School Edition</p>
              </div>
            </Link>

            {/* Divider */}
            <div className="hidden lg:block h-6 w-px bg-slate-200" />

            {/* Module nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Module navigation">
              {NAV_ITEMS.map((item) => {
                const active = router.pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={[
                      "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <span className={active ? "text-blue-600" : "text-slate-400"}>
                      {item.icon}
                    </span>
                    {item.label}
                    {active && (
                      <span className="ml-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ── Right section ── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* School badge */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "#EFF6FF",
                color: "#1D4ED8",
                border: "1px solid #BFDBFE",
              }}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span>Reno International School</span>
            </div>

            {/* Notification bell */}
            <button
              className="relative h-9 w-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <svg className="w-4.5 h-4.5 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
            </button>

            {/* Avatar */}
            <button
              className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
              aria-label="Account menu"
            >
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
              >
                AD
              </div>
              <div className="hidden sm:block text-left leading-none">
                <p className="text-xs font-semibold text-slate-800">Admin</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Administrator</p>
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

/* ── nav icons ── */
function DashboardIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
    </svg>
  );
}
function NoticeIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
    </svg>
  );
}
function StudentsIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z" />
    </svg>
  );
}
function TeachersIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  );
}
