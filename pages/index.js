import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import NoticeCard from "../components/NoticeCard";
import DeleteModal from "../components/DeleteModal";
import EmptyState from "../components/EmptyState";
import Button from "../components/ui/Button";
import { ToastContainer, useToast } from "../components/Toast";
import { deleteNotice } from "../services/noticeService";
import { CATEGORIES } from "../utils/constants";

// ============================================================
// Home Page — Notice Board
// ============================================================

export default function HomePage({ initialNotices }) {
  const [notices, setNotices]     = useState(initialNotices);
  const [modalNotice, setModal]   = useState(null);
  const [isDeleting, setDeleting] = useState(false);
  const [filterCat, setFilterCat] = useState("All");
  const [filterPri, setFilterPri] = useState("All");
  const { toasts, addToast, dismissToast } = useToast();

  const filtered = notices.filter((n) => {
    const matchCat = filterCat === "All" || n.category === filterCat;
    const matchPri = filterPri === "All" || n.priority === filterPri;
    return matchCat && matchPri;
  });

  async function handleDeleteConfirm() {
    if (!modalNotice) return;
    setDeleting(true);
    try {
      await deleteNotice(modalNotice.id);
      setNotices((prev) => prev.filter((n) => n.id !== modalNotice.id));
      addToast("Notice deleted successfully.", "success");
      setModal(null);
    } catch (err) {
      addToast(err.message || "Failed to delete notice.", "error");
    } finally {
      setDeleting(false);
    }
  }

  const urgentCount  = notices.filter((n) => n.priority === "Urgent").length;
  const examCount    = notices.filter((n) => n.category === "Exam").length;
  const eventCount   = notices.filter((n) => n.category === "Event").length;

  return (
    <Layout title="Notice Board">
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={[
          { label: "Reno ERP", href: "#" },
          { label: "Notice Board" },
        ]}
        title="Notice Board"
        subtitle="Manage school-wide announcements, exam schedules, and events."
        actions={
          <Link href="/add">
            <Button
              variant="primary"
              size="lg"
              icon={<PlusIcon />}
            >
              Create Notice
            </Button>
          </Link>
        }
      />

      {/* ── Stat widgets ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatWidget
          label="Total Notices"
          value={notices.length}
          icon={<TotalIcon />}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
          trend={null}
        />
        <StatWidget
          label="Urgent"
          value={urgentCount}
          icon={<UrgentIcon />}
          iconBg="#FEF2F2"
          iconColor="#EF4444"
          highlight={urgentCount > 0}
        />
        <StatWidget
          label="Exams"
          value={examCount}
          icon={<ExamIcon />}
          iconBg="#F5F3FF"
          iconColor="#7C3AED"
        />
        <StatWidget
          label="Events"
          value={eventCount}
          icon={<EventIcon />}
          iconBg="#F0FDF4"
          iconColor="#16A34A"
        />
      </div>

      {/* ── Toolbar ── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 px-4 py-3 rounded-xl"
        style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgb(0 0 0 / 0.04)" }}
      >
        <p className="text-sm" style={{ color: "#64748B" }}>
          Showing{" "}
          <span className="font-bold" style={{ color: "#0F172A" }}>{filtered.length}</span>
          {" "}of{" "}
          <span className="font-semibold">{notices.length}</span> notices
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {/* Active filter chips */}
          {filterCat !== "All" && (
            <FilterChip label={filterCat} onRemove={() => setFilterCat("All")} />
          )}
          {filterPri !== "All" && (
            <FilterChip label={filterPri} onRemove={() => setFilterPri("All")} />
          )}

          <FilterDropdown
            allLabel="All Categories"
            options={CATEGORIES}
            value={filterCat}
            onChange={setFilterCat}
          />
          <FilterDropdown
            allLabel="All Priorities"
            options={["Normal", "Urgent"]}
            value={filterPri}
            onChange={setFilterPri}
          />
        </div>
      </div>

      {/* ── Notice grid ── */}
      {filtered.length === 0 ? (
        <EmptyState
          title={notices.length === 0 ? "No notices yet" : "No matching notices"}
          description={
            notices.length === 0
              ? "Create your first notice to get started."
              : "Try clearing the filters to see all notices."
          }
          actionLabel={notices.length === 0 ? "Create Notice" : undefined}
          actionHref={notices.length === 0 ? "/add" : undefined}
        />
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((notice, i) => (
            <div
              key={notice.id}
              className="animate-card-in"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <NoticeCard notice={notice} onDeleteClick={setModal} />
            </div>
          ))}
        </div>
      )}

      <DeleteModal
        isOpen={!!modalNotice}
        notice={modalNotice}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setModal(null)}
        isDeleting={isDeleting}
      />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </Layout>
  );
}

// ── SSR ──
export async function getServerSideProps() {
  try {
    const prisma = (await import("../lib/prisma")).default;
    const notices = await prisma.notice.findMany({
      orderBy: [{ priority: "desc" }, { publishDate: "desc" }],
    });
    return {
      props: {
        initialNotices: notices.map((n) => ({
          ...n,
          publishDate: n.publishDate.toISOString(),
          createdAt:   n.createdAt.toISOString(),
        })),
      },
    };
  } catch (err) {
    console.error("[getServerSideProps /]", err);
    return { props: { initialNotices: [] } };
  }
}

// ── Sub-components ──

function StatWidget({ label, value, icon, iconBg, iconColor, highlight = false }) {
  return (
    <div
      className="stat-widget flex items-center gap-4"
      style={highlight ? { borderColor: "#FECACA" } : {}}
    >
      <div
        className="flex items-center justify-center h-11 w-11 rounded-xl shrink-0"
        style={{ background: iconBg }}
      >
        <span style={{ color: iconColor }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p
          className="text-2xl font-bold leading-none"
          style={{ color: highlight ? "#EF4444" : "#0F172A" }}
        >
          {value}
        </p>
        <p className="text-xs font-medium mt-1 truncate" style={{ color: "#64748B" }}>
          {label}
        </p>
      </div>
    </div>
  );
}

function FilterDropdown({ allLabel, options, value, onChange }) {
  const active = value !== "All";
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none text-sm pl-3 pr-8 py-2 rounded-lg border transition-colors focus:outline-none"
        style={
          active
            ? {
                background: "#EFF6FF",
                color: "#1D4ED8",
                borderColor: "#BFDBFE",
                fontWeight: 600,
                boxShadow: "0 0 0 2px rgb(37 99 235 / 0.10)",
              }
            : {
                background: "#FFFFFF",
                color: "#475569",
                borderColor: "#E2E8F0",
              }
        }
        aria-label={allLabel}
      >
        <option value="All">{allLabel}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
        <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function FilterChip({ label, onRemove }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: "#EFF6FF", color: "#1D4ED8", border: "1px solid #BFDBFE" }}
    >
      {label}
      <button
        onClick={onRemove}
        className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 transition-colors"
      >
        <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </span>
  );
}

function PlusIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>
  );
}
function TotalIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}
function UrgentIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function ExamIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function EventIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  );
}
