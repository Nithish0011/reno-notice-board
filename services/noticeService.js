import { API_ROUTES } from "../utils/constants";

// ============================================================
// Internal fetch wrapper
// Normalises JSON responses; throws Error with server message on failure.
// ============================================================

async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json?.message ?? `Request failed (${res.status})`);
  }

  return json;
}

// ============================================================
// NOTICE SERVICE — all API calls live here
// ============================================================

/** Fetch all notices ordered by priority + date */
export async function getAllNotices() {
  const json = await apiFetch(API_ROUTES.NOTICES);
  return json.data ?? [];
}

/** Fetch a single notice by id */
export async function getNoticeById(id) {
  const json = await apiFetch(API_ROUTES.NOTICE(id));
  return json.data;
}

/** Create a new notice; returns the created record */
export async function createNotice(payload) {
  const json = await apiFetch(API_ROUTES.NOTICES, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return json.data;
}

/** Update an existing notice; returns the updated record */
export async function updateNotice(id, payload) {
  const json = await apiFetch(API_ROUTES.NOTICE(id), {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return json.data;
}

/** Delete a notice by id */
export async function deleteNotice(id) {
  await apiFetch(API_ROUTES.NOTICE(id), { method: "DELETE" });
}
