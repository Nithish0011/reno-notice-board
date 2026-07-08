import { useState } from "react";
import { useRouter } from "next/router";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import { CATEGORIES, PRIORITIES } from "../utils/constants";
import { validateNotice } from "../utils/validation";
import { toInputDateValue } from "../utils/formatDate";

// ============================================================
// NoticeForm — reusable controlled form for Create and Edit.
// Props:
//   initialData  – notice object (edit mode); omit for create mode
//   onSubmit(formData) – async callback; receives validated form values
//   submitLabel  – button label
// ============================================================

const EMPTY = {
  title:       "",
  body:        "",
  category:    "",
  priority:    "Normal",
  publishDate: "",
  image:       "",
};

export default function NoticeForm({
  initialData,
  onSubmit,
  submitLabel = "Save Notice",
}) {
  const router = useRouter();

  const [form, setForm] = useState(() =>
    initialData
      ? {
          title:       initialData.title ?? "",
          body:        initialData.body ?? "",
          category:    initialData.category ?? "",
          priority:    initialData.priority ?? "Normal",
          publishDate: toInputDateValue(initialData.publishDate),
          image:       initialData.image ?? "",
        }
      : EMPTY
  );

  const [errors, setErrors]           = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError]   = useState("");

  // ---- handlers ----

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError)  setServerError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const { isValid, errors: ve } = validateNotice(form);
    if (!isValid) {
      setErrors(ve);
      // Scroll to first error
      const first = document.querySelector("[data-field-error]");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  // ---- render ----

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Server error banner */}
      {serverError && (
        <div className="mb-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {serverError}
        </div>
      )}

      <div className="space-y-5">
        {/* Title */}
        <div data-field-error={errors.title ? "true" : undefined}>
          <Input
            label="Title"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter notice title"
            required
            maxLength={200}
            error={errors.title}
          />
        </div>

        {/* Body */}
        <div data-field-error={errors.body ? "true" : undefined}>
          <Textarea
            label="Body"
            name="body"
            id="body"
            value={form.body}
            onChange={handleChange}
            placeholder="Enter the notice content…"
            required
            rows={5}
            maxLength={5000}
            error={errors.body}
          />
        </div>

        {/* Category + Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div data-field-error={errors.category ? "true" : undefined}>
            <Select
              label="Category"
              name="category"
              id="category"
              value={form.category}
              onChange={handleChange}
              required
              error={errors.category}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </div>

          <div data-field-error={errors.priority ? "true" : undefined}>
            <Select
              label="Priority"
              name="priority"
              id="priority"
              value={form.priority}
              onChange={handleChange}
              required
              error={errors.priority}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </Select>
          </div>
        </div>

        {/* Publish Date */}
        <div data-field-error={errors.publishDate ? "true" : undefined}>
          <Input
            label="Publish Date"
            name="publishDate"
            id="publishDate"
            type="date"
            value={form.publishDate}
            onChange={handleChange}
            required
            error={errors.publishDate}
          />
        </div>

        {/* Image URL (optional) */}
        <div data-field-error={errors.image ? "true" : undefined}>
          <Input
            label="Image URL"
            name="image"
            id="image"
            type="url"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            hint="Optional"
            error={errors.image}
          />
        </div>

        {/* Action row */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving…" : submitLabel}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            disabled={isSubmitting}
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
