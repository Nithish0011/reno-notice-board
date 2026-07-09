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

  // Redirect non-admins immediately
  useEffect(() => {
    if (role !== "admin") {
      router.replace("/");
    }
  }, [role, router]);

  // Load notice data
  useEffect(() => {
    if (!id || role !== "admin") return;

    let cancelled = false;

    setLoading(true);
    setError("");

    getNoticeById(id)
      .then((data) => {
        if (!cancelled) setNotice(data);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError("Unable to load notice.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, role]);

  if (role !== "admin") return null;

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center text-slate-500">Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="py-20 text-center text-red-600">{error}</div>
      </Layout>
    );
  }

  if (!notice) {
    return (
      <Layout>
        <div className="py-20 text-center text-slate-600">Notice not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <NoticeForm initialValues={notice} isEdit />
    </Layout>
  );
}
