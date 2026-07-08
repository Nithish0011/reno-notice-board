import Link from "next/link";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { formatShortDate, timeAgo } from "../utils/formatDate";
import { truncate } from "../utils/helpers";
import { CATEGORY_BADGE_VARIANT } from "../utils/constants";

// ============================================================
// NoticeCard — premium ERP notice card
// ============================================================

const CATEGORY_BG = {
  Exam:    { bg: "#EFF6FF", icon: "#2563EB" },
  Event:   { bg: "#F0FDF4", icon: "#16A34A" },
  General: { bg: "#F8FAFC", icon: "#475569" },
};

export default function NoticeCard({ notice, onDeleteClick }) {
  const isUrgent        = notice.priority === "Urgent";
  const categoryVariant = CATEGORY_BADGE_VARIANT[notice.category] ?? "gray";
  const catStyle        = CATEGORY_BG[notice.category] ?? CATEGORY_BG.General;

  return (
    <article
      className="reno-card flex flex-col group"
      style={{ borderRadius: "16px", minHeight: "260px" }}
    >
      {/* Top accent — urgent gets a red gradient line, others get a subtle colored dot */}
      {isUrgent ? (
        <div
          className="h-1 w-full rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, #EF4444, #F97316)" }}
        />
      ) : (
        <div
          className="h-1 w-full rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, #2563EB20, #7C3AED20)" }}
        />
      )}

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Top row — category icon + badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Category icon chip */}
          <div
            className="flex items-center justify-center h-10 w-10 rounded-xl shrink-0"
            style={{ background: catStyle.bg }}
          >
            <CategoryIcon category={notice.category} color={catStyle.icon} />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 justify-end">
            <Badge variant={categoryVariant}>{notice.category}</Badge>
            {isUrgent && <Badge variant="red" dot>Urgent</Badge>}
          </div>
        </div>

        {/* Title */}
        <h2
          className="text-base font-bold leading-snug line-clamp-2 mb-2"
          style={{ color: "#0F172A", letterSpacing: "-0.01em" }}
        >
          {notice.title}
        </h2>

        {/* Body preview */}
        <p className="text-sm leading-relaxed line-clamp-3 flex-1" style={{ color: "#64748B" }}>
          {truncate(notice.body, 140)}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: "1px solid #F1F5F9" }}>
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#94A3B8" }}>
            <CalendarIcon />
            {formatShortDate(notice.publishDate)}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#94A3B8" }}>
            <ClockIcon />
            {timeAgo(notice.createdAt)}
          </span>
        </div>
      </div>

      {/* Action footer */}
      <div
        className="px-5 py-4 flex items-center gap-2 rounded-b-2xl"
        style={{ borderTop: "1px solid #F1F5F9", background: "#FAFBFC" }}
      >
        <Link href={`/edit/${notice.id}`} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full" icon={<EditIcon />}>
            Edit
          </Button>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:bg-red-50 hover:text-red-600"
          style={{ color: "#64748B" }}
          onClick={() => onDeleteClick(notice)}
          icon={<TrashIcon />}
        >
          Delete
        </Button>
      </div>
    </article>
  );
}

/* ── Category icon ── */
function CategoryIcon({ category, color }) {
  if (category === "Exam") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    );
  }
  if (category === "Event") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

/* ── micro icons ── */
function CalendarIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
    </svg>
  );
}
