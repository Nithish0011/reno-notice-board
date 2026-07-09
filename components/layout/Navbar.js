import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Plus,
  User,
  ShieldCheck,
} from "lucide-react";
import { useRole } from "../../context/RoleContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { role, setRole } = useRole();

  const toggleRole = () => {
    setRole(role === "admin" ? "student" : "admin");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <imgage
            src="../../public/N_Logo.png"
            alt="N"
            className="h-10 w-10 object-contain"
          />

          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-slate-900">
              Reno Notice Board
            </h1>

            <p className="text-xs text-slate-500">
              School Management System
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Notices
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">

          {/* Current Role Badge */}
          <div
            className={`rounded-full px-3 py-2 text-sm font-semibold ${
              role === "admin"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {role === "admin" ? "Admin" : "Student"}
          </div>

          {/* Toggle Role */}
          <button
            onClick={toggleRole}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition ${
              role === "admin"
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            {role === "admin" ? (
              <>
                <User size={18} />
                Student View
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                Admin View
              </>
            )}
          </button>

          {/* Create Notice */}
          {role === "admin" && (
            <Link href="/add">
              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700">
                <Plus size={18} />
                Create Notice
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-white lg:hidden">
          <nav className="flex flex-col px-4 py-4">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              Home
            </Link>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              Notices
            </Link>

            {/* Current Role */}
            <div
              className={`mt-4 rounded-lg px-4 py-3 text-center font-semibold ${
                role === "admin"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              Current: {role === "admin" ? "Admin" : "Student"}
            </div>

            {/* Toggle */}
            <button
              onClick={toggleRole}
              className={`mt-3 flex items-center justify-center gap-2 rounded-xl py-3 font-medium transition ${
                role === "admin"
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              {role === "admin" ? (
                <>
                  <User size={18} />
                  Switch to Student View
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Switch to Admin View
                </>
              )}
            </button>

            {/* Create Notice */}
            {role === "admin" && (
              <Link
                href="/add"
                onClick={() => setOpen(false)}
                className="mt-4"
              >
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700">
                  <Plus size={18} />
                  Create Notice
                </button>
              </Link>
            )}

          </nav>
        </div>
      )}
    </header>
  );
}