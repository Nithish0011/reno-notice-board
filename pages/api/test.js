import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    const notices = await prisma.notice.findMany();

    res.status(200).json({
      success: true,
      data: notices,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}