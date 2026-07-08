import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { ToastContainer, useToast } from "../components/Toast";

// ============================================================
// Root App — mounts global toast layer and handles query-string
// success signals from post-submit redirects.
// ============================================================

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { toasts, addToast, dismissToast } = useToast();

  // Show toasts based on redirect query params
  useEffect(() => {
    const { created, updated } = router.query;

    if (created) {
      addToast("Notice created successfully.", "success");
      // Remove query param without re-fetching
      const { created: _c, ...rest } = router.query;
      router.replace({ pathname: router.pathname, query: rest }, undefined, {
        shallow: true,
      });
    }

    if (updated) {
      addToast("Notice updated successfully.", "success");
      const { updated: _u, ...rest } = router.query;
      router.replace({ pathname: router.pathname, query: rest }, undefined, {
        shallow: true,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
