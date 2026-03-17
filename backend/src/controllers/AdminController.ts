import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import { SignUpSchema } from "../schemas/user.schema.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export async function AdminSignup(req: Request, res: Response) {

    const parsedData = SignUpSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid Input",
            error: parsedData.error.flatten()
        })
    };

    const { username, email, password } = parsedData.data;

    try {

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

     const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role: "ADMIN"
            }
        })

         return res.status(201).json({
            success: true,
            message:"Admin created successfully",
            data:{
                id:newUser.id
            }
        })

    } catch (error:any) {
         if (error.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "Email already exists"
    });
  }
console.error("AdminSignup Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}