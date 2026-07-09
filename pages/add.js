import { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../components/layout/Layout";
import NoticeForm from "../components/notices/NoticeForm";
import { useRole } from "../context/RoleContext";

export default function AddNoticePage() {
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (role !== "admin") {
      router.replace("/");
    }
  }, [role, router]);

  if (role !== "admin") {
    return null;
  }

  return (
    <Layout>
      <NoticeForm />
    </Layout>
  );
}