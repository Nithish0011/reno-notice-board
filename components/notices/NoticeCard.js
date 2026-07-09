import Link from "next/link";
import { Calendar, Download, Pencil, Trash2 } from "lucide-react";
import { useRole } from "../../context/RoleContext";

const categoryStyles = {
  Exam:    "bg-blue-100 text-blue-700",
  Event:   "bg-green-100 text-green-700",
  General: "bg-slate-100 text-slate-700",
};

export default function NoticeCard({ notice, onDelete }) {
  const { role } = useRole();

  return (
    <article className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">

      {/* Title */}
      <h2 className="text-xl font-bold text-slate-900">
        {notice.title}
      </h2>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {notice.body}
      </p>

      {/* Badges — below description */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            categoryStyles[notice.category] ?? categoryStyles.General
          }`}
        >
          {notice.category}
        </span>

        {notice.priority === "Urgent" && (
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
            Urgent
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">

        {/* Date */}
        <div className="flex items-center gap-1.5 text-slate-500">
          <Calendar size={15} />
          <span className="text-sm font-medium">
            {new Date(notice.publishDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Admin-only actions */}
        {role === "admin" && (
          <div className="flex items-center gap-2">

            {/* Download */}
            <button
              className="rounded-lg bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
              title="Download"
            >
              <Download size={15} />
            </button>

            {/* Edit */}
            <Link
              href={`/edit/${notice.id}`}
              className="rounded-lg bg-orange-500 p-2 text-white transition hover:bg-orange-600"
              title="Edit"
            >
              <Pencil size={15} />
            </Link>

            {/* Delete */}
            <button
              onClick={() => onDelete(notice.id)}
              className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
              title="Delete"
            >
              <Trash2 size={15} />
            </button>

          </div>
        )}

      </div>
    </article>
  );
}
