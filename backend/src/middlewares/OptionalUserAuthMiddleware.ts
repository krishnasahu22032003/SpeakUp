import type { Request, Response, NextFunction } from "express";
import { ENV } from "../lib/ENV.js";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

const secret = ENV.JWT_SECRET;

export async function OptionalUserAuthMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token =
    req.cookies?.["user-token"] ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, secret as string) as any;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true },
    });

    req.user = user || null;
  } catch {
    req.user = null;
  }

  next();
}