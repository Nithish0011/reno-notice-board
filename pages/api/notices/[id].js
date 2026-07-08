import prisma from "../../../lib/prisma";

// Validation
const VALID_CATEGORIES = ["Exam", "Event", "General"];
const VALID_PRIORITIES = ["Normal", "Urgent"];

function validateNotice(data) {
  const { title, body, publishDate, category, priority } = data;

  if (!title || title.trim() === "") {
    return "Title is required.";
  }

  if (!body || body.trim() === "") {
    return "Body is required.";
  }

  if (!publishDate || isNaN(Date.parse(publishDate))) {
    return "Valid publish date is required.";
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
  const { id } = req.query;

  const noticeId = Number(id);

  if (isNaN(noticeId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Notice ID",
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

/* ===========================
   GET SINGLE NOTICE
=========================== */

async function getNotice(id, res) {
  try {
    const notice = await prisma.notice.findUnique({
      where: {
        id,
      },
    });

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    console.error("GET Notice:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notice.",
    });
  }
}

/* ===========================
   UPDATE NOTICE
=========================== */

async function updateNotice(id, req, res) {
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

    const notice = await prisma.notice.update({
      where: {
        id,
      },
      data: {
        title: title.trim(),
        body: body.trim(),
        category,
        priority,
        publishDate: new Date(publishDate),
        image: image || null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Notice updated successfully.",
      data: notice,
    });
  } catch (error) {
    console.error("UPDATE Notice:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update notice.",
    });
  }
}

/* ===========================
   DELETE NOTICE
=========================== */

async function deleteNotice(id, res) {
  try {
    await prisma.notice.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Notice deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE Notice:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete notice.",
    });
  }
}