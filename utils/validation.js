import { CATEGORIES, PRIORITIES } from "./constants";

// ===========================
// FIELD VALIDATORS
// ===========================

export function validateTitle(title) {
  if (!title || title.trim() === "") return "Title is required.";
  if (title.trim().length < 3) return "Title must be at least 3 characters.";
  if (title.trim().length > 200) return "Title must not exceed 200 characters.";
  return null;
}

export function validateBody(body) {
  if (!body || body.trim() === "") return "Body is required.";
  if (body.trim().length < 10) return "Body must be at least 10 characters.";
  if (body.trim().length > 5000) return "Body must not exceed 5000 characters.";
  return null;
}

export function validateCategory(category) {
  if (!category) return "Category is required.";
  if (!CATEGORIES.includes(category)) return "Invalid category selected.";
  return null;
}

export function validatePriority(priority) {
  if (!priority) return "Priority is required.";
  if (!PRIORITIES.includes(priority)) return "Invalid priority selected.";
  return null;
}

export function validatePublishDate(publishDate) {
  if (!publishDate) return "Publish date is required.";
  if (isNaN(Date.parse(publishDate))) return "Invalid publish date.";
  return null;
}

export function validateImageUrl(image) {
  if (!image) return null; // optional field
  try {
    new URL(image);
    return null;
  } catch {
    return "Image must be a valid URL.";
  }
}

// ===========================
// FULL NOTICE VALIDATOR
// ===========================

/**
 * Validates a notice payload.
 * @param {object} data - The notice fields.
 * @returns {{ isValid: boolean, errors: object }} - Result with per-field errors.
 */
export function validateNotice(data) {
  const errors = {};

  const titleError = validateTitle(data.title);
  if (titleError) errors.title = titleError;

  const bodyError = validateBody(data.body);
  if (bodyError) errors.body = bodyError;

  const categoryError = validateCategory(data.category);
  if (categoryError) errors.category = categoryError;

  const priorityError = validatePriority(data.priority);
  if (priorityError) errors.priority = priorityError;

  const publishDateError = validatePublishDate(data.publishDate);
  if (publishDateError) errors.publishDate = publishDateError;

  const imageError = validateImageUrl(data.image);
  if (imageError) errors.image = imageError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Returns the first error message found across all fields, or null.
 * Useful for server-side single-message responses.
 * @param {object} data
 * @returns {string|null}
 */
export function getFirstValidationError(data) {
  const { isValid, errors } = validateNotice(data);
  if (isValid) return null;
  return Object.values(errors)[0];
}
