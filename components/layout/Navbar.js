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
import {logo} from "../../public/N_Logo.png"

function RoleSwitchButton({ role, onToggle }) {
  const isAdmin = role === "admin";

  return (
    <button
      onClick={onToggle}
      title={isAdmin ? "Switch to Student View" : "Switch to Admin View"}
      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95
      ${
        isAdmin
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
      }`}
    >
      {isAdmin ? (
        <>
          <User size={18} />
          <span className="hidden sm:inline">
            Student
          </span>
        </>
      ) : (
        <>
          <ShieldCheck size={18} />
          <span className="hidden sm:inline">
            Admin
          </span>
        </>
      )}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { role, setRole } = useRole();

  function toggleRole() {
    setRole(role === "admin" ? "student" : "admin");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">

          <imgage
          src={logo}
          alt="Reno Logo"
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

        {/* Right Side */}

        <div className="flex items-center gap-2">

          {/* Current Role Badge */}

          <div
            className={`hidden md:flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold
            ${
              role === "admin"
                ? "bg-blue-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {role === "admin" ? (
              <>
                <ShieldCheck size={16} />
                Admin
              </>
            ) : (
              <>
                <User size={16} />
                Student
              </>
            )}
          </div>

          {/* Switch Role */}

          <RoleSwitchButton
            role={role}
            onToggle={toggleRole}
          />

          {/* Admin Only */}

          {role === "admin" && (
            <Link
              href="/add"
              className="hidden lg:block"
            >
              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
                <Plus size={17} />
                Create Notice
              </button>
            </Link>
          )}

          {/* Mobile Menu */}

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
          >
            {open ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="border-t bg-white lg:hidden">

          <nav className="flex flex-col gap-2 px-4 py-4">

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

            {/* Mobile Current Role */}

            <div
              className={`mt-2 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold
              ${
                role === "admin"
                  ? "bg-blue-600 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {role === "admin" ? (
                <>
                  <ShieldCheck size={16} />
                  Admin Mode
                </>
              ) : (
                <>
                  <User size={16} />
                  Student Mode
                </>
              )}
            </div>

            {role === "admin" && (
              <Link
                href="/add"
                onClick={() => setOpen(false)}
              >
                <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700">
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