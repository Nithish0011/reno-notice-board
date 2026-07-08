import { useRouter } from "next/router";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/ui/Card";
import NoticeForm from "../components/NoticeForm";
import { ToastContainer, useToast } from "../components/Toast";
import { createNotice } from "../services/noticeService";

// ============================================================
// Add Notice Page
// ============================================================

export default function AddNoticePage() {
  const router = useRouter();
  const { toasts, addToast, dismissToast } = useToast();

  async function handleSubmit(formData) {
    await createNotice(formData);
    // Push to home with a success flag so the home page can show a toast
    router.push("/?created=1");
  }

  return (
    <Layout title="Create Notice">
      <div className="max-w-2xl mx-auto">
        <PageHeader
          breadcrumb={[
            { label: "Reno ERP",      href: "#" },
            { label: "Notice Board",  href: "/" },
            { label: "Create Notice" },
          ]}
          title="Create Notice"
          subtitle="Add a new announcement, event, or exam notice."
        />

        <Card>
          <Card.Header>
            <h2 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">
              Notice Details
            </h2>
          </Card.Header>

          <Card.Body className="pt-1 pb-6">
            <NoticeForm
              onSubmit={handleSubmit}
              submitLabel="Create Notice"
            />
          </Card.Body>
        </Card>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </Layout>
  );
}
