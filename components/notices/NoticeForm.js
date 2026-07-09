import { useState } from "react";
import { useRouter } from "next/router";
import { createNotice, updateNotice } from "../../services/noticeService";

const categories = ["Exam", "Event", "General"];
const priorities = ["Normal", "Urgent"];

export default function NoticeForm({
  initialValues = null,
  isEdit = false,
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: initialValues?.title || "",
    body: initialValues?.body || "",
    category: initialValues?.category || "General",
    priority: initialValues?.priority || "Normal",
    publishDate: initialValues?.publishDate
      ? initialValues.publishDate.substring(0, 10)
      : "",
    image: initialValues?.image || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!form.title.trim()) return setError("Title is required.");
    if (!form.body.trim()) return setError("Description is required.");
    if (!form.publishDate) return setError("Publish date is required.");

    setLoading(true);

    try {
      if (isEdit) {
        await updateNotice(initialValues.id, form);
      } else {
        await createNotice(form);
      }

      router.push("/");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
      <h1 className="text-3xl font-bold mb-8">
        {isEdit ? "Edit Notice" : "Create Notice"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {error && (
          <div className="rounded-lg bg-red-50 text-red-700 p-3">
            {error}
          </div>
        )}

        <div>
          <label className="block mb-2 font-medium">
            Title
          </label>

          <input
            className="w-full rounded-lg border p-3"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows="5"
            className="w-full rounded-lg border p-3"
            name="body"
            value={form.body}
            onChange={handleChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              className="w-full rounded-lg border p-3"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Priority
            </label>

            <select
              className="w-full rounded-lg border p-3"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              {priorities.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

        </div>

        <div>
          <label className="block mb-2 font-medium">
            Publish Date
          </label>

          <input
            type="date"
            className="w-full rounded-lg border p-3"
            name="publishDate"
            value={form.publishDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Image URL (Optional)
          </label>

          <input
            className="w-full rounded-lg border p-3"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-lg border"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white"
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Notice"
              : "Create Notice"}
          </button>

        </div>

      </form>
    </div>
  );
}