import prisma from "../../../lib/prisma";
import { getFirstValidationError } from "../../../utils/validation";

// ===========================
// ROUTER
// ===========================

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getNotices(res);
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

async function getNotices(res) {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [{ priority: "desc" }, { publishDate: "desc" }],
    });

    return res.status(200).json({
      success: true,
      count: notices.length,
      data: notices,
    });
  } catch (error) {
    console.error("[GET /api/notices]", error);
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
    const validationError = getFirstValidationError(req.body);

    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const { title, body, category, priority, publishDate, image } = req.body;

    const notice = await prisma.notice.create({
      data: {
        title: title.trim(),
        body: body.trim(),
        category,
        priority,
        publishDate: new Date(publishDate),
        image: image?.trim() || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Notice created successfully.",
      data: notice,
    });
  } catch (error) {
    console.error("[POST /api/notices]", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create notice.",
    });
  }
}
