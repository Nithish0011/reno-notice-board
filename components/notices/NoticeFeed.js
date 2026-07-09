import { useEffect, useState } from "react";
import { getAllNotices } from "../../services/noticeService";
import NoticeCard from "./NoticeCard";

export default function NoticeFeed() {

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data = await getAllNotices();

        setNotices(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  if (loading) {
    return <p>Loading notices...</p>;
  }

  if (notices.length === 0) {
    return <p>No notices found.</p>;
  }

  return (

    <div className="space-y-6">

      {notices.map((notice) => (

        <NoticeCard
          key={notice.id}
          notice={notice}
        />

      ))}

    </div>

  );

}