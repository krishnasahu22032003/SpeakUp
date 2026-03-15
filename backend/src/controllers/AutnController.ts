import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { SignUpSchema } from "../schemas/user.schema.js";
const SALT_ROUNDS = 12;

export async function UserSignUp(req: Request, res: Response) {



    const parsedData = SignUpSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
  success: false,
  errors: parsedData.error.flatten()
})
    }

    const { username, email, password } = parsedData.data

    const checkEmail = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (checkEmail) {
        return res.status(400).json({
            success: false,
            message: "Email Already exists Please use different email"
        })
    };

    try {

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
               
            }
        })

        if (!newUser) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data:{
                username:newUser.username,
                id:newUser.id,
                email:newUser.email,
                role:newUser.role
            }
        })
    } catch (error) {
     console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    };

}