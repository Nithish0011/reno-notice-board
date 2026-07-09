import { useEffect, useMemo, useState } from "react";
import {
  getAllNotices,
  deleteNotice,
} from "../../services/noticeService";
import SearchBar from "../dashboard/SearchBar";
import NoticeCard from "./NoticeCard";

export default function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadNotices();
  }, []);

  async function loadNotices() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllNotices();
      setNotices(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load notices.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) return;

    try {
      await deleteNotice(id);

      setNotices((prev) =>
        prev.filter((notice) => notice.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete notice.");
    }
  }

  // Search Results
  const searchResults = useMemo(() => {
    if (!search.trim()) return notices;

    const query = search.toLowerCase();

    return notices.filter(
      (notice) =>
        notice.title.toLowerCase().includes(query) ||
        notice.body.toLowerCase().includes(query)
    );
  }, [notices, search]);

  // Show all notices if no matches found
  const filteredNotices =
    search.trim() && searchResults.length === 0
      ? notices
      : searchResults;

  if (loading) {
    return (
      <div className="space-y-5">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-48 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-red-600">
          {error}
        </h2>

        <button
          onClick={loadNotices}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty Database
  if (notices.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">
          No Notices Found
        </h2>

        <p className="mt-2 text-slate-500">
          Create your first notice.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Search */}
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* Warning */}
      {search.trim() && searchResults.length === 0 && (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-800 shadow-sm">
          <span className="font-semibold">
            No matching notices found.
          </span>{" "}
          Showing all available notices instead.
        </div>
      )}

      {/* Notice List */}
      <div className="space-y-5">
        {filteredNotices.map((notice) => (
          <NoticeCard
            key={notice.id}
            notice={notice}
            onDelete={handleDelete}
          />
        ))}
      </div>

    </div>
  );
}