// ===========================
// DATE FORMATTING UTILITIES
// ===========================

/**
 * Formats a date to a human-readable string.
 * e.g. "July 8, 2026"
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a date to a short string.
 * e.g. "Jul 8, 2026"
 * @param {string|Date} date
 * @returns {string}
 */
export function formatShortDate(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Formats a datetime to include time.
 * e.g. "July 8, 2026 at 3:45 PM"
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateTime(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Converts a Date or ISO string to the "YYYY-MM-DD" format
 * required by HTML date input elements.
 * @param {string|Date} date
 * @returns {string}
 */
export function toInputDateValue(date) {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns a relative time string like "3 days ago" or "in 2 hours".
 * @param {string|Date} date
 * @returns {string}
 */
export function timeAgo(date) {
  if (!date) return "N/A";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(Math.abs(seconds) / interval.seconds);
    if (count >= 1) {
      const suffix = count === 1 ? interval.label : `${interval.label}s`;
      return seconds < 0
        ? `in ${count} ${suffix}`
        : `${count} ${suffix} ago`;
    }
  }

  return "just now";
}
