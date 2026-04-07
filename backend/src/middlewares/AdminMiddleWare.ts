import type { Request,Response,NextFunction } from "express";
import { ENV } from "../lib/ENV.js";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

interface JwtPayload {
  userId: number;
  role: "USER" | "ADMIN";
}


if (!ENV.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const secret = ENV.JWT_SECRET;

export async function AdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token =
    req.cookies?.["admin-token"] ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Admin token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const admin = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Not an admin",
      });
    }

    req.user = admin;
    next();

  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid admin token",
    });
  }
}
