import Spinner from "./ui/Spinner";

// ============================================================
// Loader — full-area loading state
// ============================================================

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="relative">
        <Spinner size="xl" />
        <div
          className="absolute inset-0 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #2563EB, transparent)", filter: "blur(8px)" }}
        />
      </div>
      <p className="text-sm font-medium text-slate-500 animate-pulse">{message}</p>
    </div>
  );
}
