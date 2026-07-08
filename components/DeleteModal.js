import Modal from "./ui/Modal";
import Button from "./ui/Button";

// ============================================================
// DeleteModal — premium confirmation dialog
// ============================================================

export default function DeleteModal({ isOpen, notice, onConfirm, onCancel, isDeleting }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Delete Notice">
      <div className="px-6 pt-6 pb-2 flex flex-col items-center text-center gap-5">
        {/* Icon */}
        <div
          className="flex items-center justify-center w-14 h-14 rounded-2xl"
          style={{ background: "#FEF2F2" }}
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </div>

        {/* Copy */}
        <div className="space-y-2 max-w-xs">
          <h3 className="text-base font-bold text-slate-900">Are you sure?</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            You are about to permanently delete
          </p>
          <p
            className="text-sm font-semibold px-3 py-1.5 rounded-lg truncate"
            style={{ background: "#F8FAFC", color: "#0F172A", border: "1px solid #E2E8F0" }}
          >
            &ldquo;{notice?.title}&rdquo;
          </p>
          <p className="text-xs text-slate-400">This action cannot be undone.</p>
        </div>
      </div>

      {/* Actions */}
      <div
        className="flex items-center justify-end gap-2 px-6 py-5 mt-4"
        style={{ borderTop: "1px solid #F1F5F9" }}
      >
        <Button variant="secondary" size="md" onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="danger" size="md" loading={isDeleting} onClick={onConfirm}>
          Delete Notice
        </Button>
      </div>
    </Modal>
  );
}
