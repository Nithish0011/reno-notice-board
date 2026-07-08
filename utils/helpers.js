// ===========================
// GENERAL HELPERS
// ===========================

/**
 * Truncates a string to a max length and appends "...".
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(str, maxLength = 120) {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Capitalises the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export function capitalise(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Strips leading/trailing whitespace from all string fields in an object.
 * @param {object} obj
 * @returns {object}
 */
export function trimObjectStrings(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  );
}

/**
 * Builds a query string from a plain object, skipping null/undefined/empty values.
 * @param {object} params
 * @returns {string}
 */
export function buildQueryString(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && value !== "") {
      query.append(key, value);
    }
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Returns true if a value is a non-empty string.
 * @param {*} value
 * @returns {boolean}
 */
export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Safely parses JSON, returning null on failure.
 * @param {string} str
 * @returns {*}
 */
export function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

/**
 * Groups an array of objects by a given key.
 * @param {object[]} array
 * @param {string} key
 * @returns {object}
 */
export function groupBy(array, key) {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {});
}
