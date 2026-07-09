import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <section className="mb-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500">
        <span>Dashboard</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-slate-700">
          Notice Board
        </span>
      </div>

      {/* Header */}
      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Notice Board
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Manage school announcements, events,
            examinations and important updates for students,
            teachers and parents.
          </p>
        </div>

        <Link
          href="/add"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-md
            transition
            hover:bg-blue-700
            hover:shadow-lg
            w-full
            sm:w-auto
          "
        >
          <Plus className="h-5 w-5" />
          Create Notice
        </Link>

      </div>
    </section>
  );
}