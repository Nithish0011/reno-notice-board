import prisma from "../../../lib/prisma";

// Constants
const VALID_CATEGORIES = ["Exam", "Event", "General"];
const VALID_PRIORITIES = ["Normal", "Urgent"];

// Validation Function
function validateNotice(data) {
  const { title, body, publishDate, category, priority } = data;

  if (!title || title.trim() === "") {
    return "Title is required.";
  }

  if (!body || body.trim() === "") {
    return "Body is required.";
  }

  if (!publishDate || isNaN(Date.parse(publishDate))) {
    return "A valid publish date is required.";
  }

  if (!VALID_CATEGORIES.includes(category)) {
    return "Invalid category.";
  }

  if (!VALID_PRIORITIES.includes(priority)) {
    return "Invalid priority.";
  }

  return null;
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getNotices(req, res);

    case "POST":
      return createNotice(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} Not Allowed`,
      });
  }
}

// ===========================
// GET ALL NOTICES
// ===========================
async function getNotices(req, res) {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [
        {
          priority: "desc",
        },
        {
          publishDate: "desc",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      count: notices.length,
      data: notices,
    });
  } catch (error) {
    console.error("GET /api/notices:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notices.",
    });
  }
}

// ===========================
// CREATE NOTICE
// ===========================
async function createNotice(req, res) {
  try {
    const validationError = validateNotice(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const {
      title,
      body,
      category,
      priority,
      publishDate,
      image,
    } = req.body;

    const notice = await prisma.notice.create({
      data: {
        title: title.trim(),
        body: body.trim(),
        category,
        priority,
        publishDate: new Date(publishDate),
        image: image || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Notice created successfully.",
      data: notice,
    });
  } catch (error) {
    console.error("POST /api/notices:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create notice.",
    });
  }
}