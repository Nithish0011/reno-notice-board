import Head from "next/head";
import Navbar from "./Navbar";
import { APP_NAME, APP_DESCRIPTION } from "../utils/constants";

// ============================================================
// Layout — page shell with <Head>, Navbar, and content area
// ============================================================

export default function Layout({ children, title, description }) {
  const pageTitle       = title ? `${title} — ${APP_NAME}` : APP_NAME;
  const metaDescription = description || APP_DESCRIPTION;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </>
  );
}
