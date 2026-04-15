import type { NextFunction , Request , Response} from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../lib/ENV.js";
import { prisma } from "../lib/prisma.js";


interface JwtPayload {
  userId: number;
  role: "USER" | "ADMIN";
}

if (!ENV.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
};


const secret = ENV.JWT_SECRET;

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token =
    req.cookies?.["user-token"] ||
    req.cookies?.["admin-token"] ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user;
    next();

  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
}