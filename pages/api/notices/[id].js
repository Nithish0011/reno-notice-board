import prisma from "../../../lib/prisma";
import { getFirstValidationError } from "../../../utils/validation";

// ===========================
// ROUTER
// ===========================

export default async function handler(req, res) {
  const { id } = req.query;
  const noticeId = Number(id);

  if (!Number.isInteger(noticeId) || noticeId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid notice ID.",
    });
  }

  switch (req.method) {
    case "GET":
      return getNotice(noticeId, res);
    case "PUT":
      return updateNotice(noticeId, req, res);
    case "DELETE":
      return deleteNotice(noticeId, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} Not Allowed`,
      });
  }
}

// ===========================
// GET SINGLE NOTICE
// ===========================

async function getNotice(id, res) {
  try {
    const notice = await prisma.notice.findUnique({ where: { id } });

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    return res.status(200).json({ success: true, data: notice });
  } catch (error) {
    console.error(`[GET /api/notices/${id}]`, error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notice.",
    });
  }
}

// ===========================
// UPDATE NOTICE
// ===========================

async function updateNotice(id, req, res) {
  try {
    const validationError = getFirstValidationError(req.body);

    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const { title, body, category, priority, publishDate, image } = req.body;

    const existing = await prisma.notice.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    const notice = await prisma.notice.update({
      where: { id },
      data: {
        title: title.trim(),
        body: body.trim(),
        category,
        priority,
        publishDate: new Date(publishDate),
        image: image?.trim() || null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Notice updated successfully.",
      data: notice,
    });
  } catch (error) {
    console.error(`[PUT /api/notices/${id}]`, error);
    return res.status(500).json({
      success: false,
      message: "Failed to update notice.",
    });
  }
}

// ===========================
// DELETE NOTICE
// ===========================

async function deleteNotice(id, res) {
  try {
    const existing = await prisma.notice.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    await prisma.notice.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: "Notice deleted successfully.",
    });
  } catch (error) {
    console.error(`[DELETE /api/notices/${id}]`, error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete notice.",
    });
  }
}
