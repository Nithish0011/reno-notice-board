import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-white">

      {/* Top Left Light */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-3xl" />

      {/* Top Right Light */}
      <div className="absolute -top-24 right-0 h-[350px] w-[350px] rounded-full bg-indigo-300/15 blur-3xl" />

      {/* Bottom Left Light */}
      <div className="absolute bottom-0 -left-20 h-[400px] w-[400px] rounded-full bg-cyan-300/15 blur-3xl" />

      {/* Bottom Right Light */}
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-green-300/15 blur-3xl" />

      {/* Center Glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />

      <div className="relative z-10">
        <Navbar />

        <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
          {children}
        </main>
      </div>

    </div>
  );
}