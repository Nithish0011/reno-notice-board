import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout";
import NoticeForm from "../../components/NoticeForm";
import Loader from "../../components/Loader";
import { updateNotice } from "../../services/noticeService";

// ===========================
// EDIT NOTICE PAGE
// ===========================

export default function EditNoticePage({ notice, error }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout title="Loading...">
        <Loader />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Notice Not Found">
        <div className="max-w-2xl mx-auto py-20 text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">
            Notice Not Found
          </h1>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  async function handleSubmit(formData) {
    await updateNotice(notice.id, formData);
    router.push("/");
  }

  return (
    <Layout title="Edit Notice">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Edit Notice</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Notice</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <NoticeForm
            initialData={notice}
            onSubmit={handleSubmit}
            submitLabel="Update Notice"
          />
        </div>
      </div>
    </Layout>
  );
}

// ===========================
// SERVER-SIDE DATA FETCH
// ===========================

export async function getServerSideProps(context) {
  const { id } = context.params;
  const noticeId = Number(id);

  if (!Number.isInteger(noticeId) || noticeId <= 0) {
    return { props: { notice: null, error: "Invalid notice ID." } };
  }

  try {
    const prisma = (await import("../../lib/prisma")).default;

    const notice = await prisma.notice.findUnique({ where: { id: noticeId } });

    if (!notice) {
      return { props: { notice: null, error: "Notice not found." } };
    }

    // Serialize dates
    const serialized = {
      ...notice,
      publishDate: notice.publishDate.toISOString(),
      createdAt: notice.createdAt.toISOString(),
    };

    return { props: { notice: serialized, error: null } };
  } catch (error) {
    console.error("[getServerSideProps edit]", error);
    return { props: { notice: null, error: "Failed to load notice." } };
  }
}
