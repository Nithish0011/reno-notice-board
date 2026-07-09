export default function LeftSidebar() {
  return (
    <div className="space-y-5">

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-slate-800">
          Latest News
        </h3>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-slate-800">
          Today&apos;s Events
        </h3>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-slate-800">
          Holidays
        </h3>
      </div>

    </div>
  );
}