import { PrismaClient } from "@prisma/client";

// ===========================
// PRISMA SINGLETON
// Prevents multiple instances during Next.js hot-reload in development.
// ===========================

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
