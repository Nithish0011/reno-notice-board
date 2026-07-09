import {
  FileText,
  AlertTriangle,
  GraduationCap,
  CalendarDays,
} from "lucide-react";

const icons = {
  total: FileText,
  urgent: AlertTriangle,
  exams: GraduationCap,
  events: CalendarDays,
};

const colors = {
  total: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
  },
  urgent: {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-100",
  },
  exams: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-100",
  },
  events: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-100",
  },
};

export default function StatCard({
  type,
  title,
  value,
  subtitle,
}) {
  const Icon = icons[type];
  const color = colors[type];

  return (
    <div
      className={`rounded-2xl border ${color.border} bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-6`}
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2 text-slate-900">
            {value}
          </h2>

          <p className="text-sm mt-2 text-slate-500">
            {subtitle}
          </p>

        </div>

        <div
          className={`h-14 w-14 rounded-xl ${color.bg} flex items-center justify-center`}
        >
          <Icon className={`h-7 w-7 ${color.text}`} />
        </div>

      </div>
    </div>
  );
}