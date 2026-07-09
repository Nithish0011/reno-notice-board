import Layout from "../components/layout/Layout";
import LeftSidebar from "../components/sidebar/LeftSidebar";
import RightSidebar from "../components/sidebar/RightSidebar";
import NoticeList from "../components/notices/NoticeList";

export default function Home() {
  return (
    <Layout>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <aside className="hidden lg:block lg:col-span-2">
          <LeftSidebar />
        </aside>

        <main className="col-span-1 lg:col-span-8">
          <NoticeList />
        </main>

        <aside className="hidden lg:block lg:col-span-2">
          <RightSidebar />
        </aside>

      </div>

    </Layout>
  );
}