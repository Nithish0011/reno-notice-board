import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout/Layout";
import NoticeForm from "../../components/notices/NoticeForm";
import { getNoticeById } from "../../services/noticeService";
import { useRole } from "../../context/RoleContext";

export default function EditNoticePage() {
  const router = useRouter();
  const { id } = router.query;

  const { role } = useRole();

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Protect page
  useEffect(() => {
    if (role !== "admin") {
      router.replace("/");
    }
  }, [role, router]);

  useEffect(() => {
    if (!id || role !== "admin") return;

    loadNotice();
  }, [id, role]);

  async function loadNotice() {
    try {
      const data = await getNoticeById(id);
      setNotice(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load notice.");
    } finally {
      setLoading(false);
    }
  }

  // Prevent rendering while redirecting
  if (role !== "admin") {
    return null;
  }

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center">
          Loading...
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="py-20 text-center text-red-600">
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <NoticeForm
        initialValues={notice}
        isEdit
      />
    </Layout>
  );
}