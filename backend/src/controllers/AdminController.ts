import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import { SignInSchema, SignUpSchema } from "../schemas/user.schema.js";
import bcrypt from "bcrypt";
import { ENV } from "../lib/ENV.js";
import jwt from "jsonwebtoken"
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
} ;

export async function GetAdminDetails(req:Request , res:Response){

if(!req.user || !req.user.id || req.user.role !== "ADMIN"){
    return res.status(403).json({
        success:false,
        message:"Unauthorized"
    });
};

try{

    const admin = await prisma.user.findUnique({
        where:{id:req.user.id}, 
        select:{
        id:true,
        username:true,
        email:true,
        role:true
    }
    });
   if(!admin){
     return res.status(404).json({
        success: false,
        message: "User does not exist"
      })
   };
    return res.status(200).json({
      success: true,
      data: admin
    })
}catch (error) {
    console.error("GetAdminDetails Error:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export async function AdminSignIn(req: Request, res: Response) {
  const parsedData = SignInSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
    });
  }

  const { email, password } = parsedData.data;

  try {
    const checkUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        role: true,
      },
    });

    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (checkUser.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admins only",
      });
    }

    const comparePassword = await bcrypt.compare(password, checkUser.password);

    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!ENV.JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    const token = jwt.sign(
      { userId: checkUser.id, role: checkUser.role },
      ENV.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("admin-token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Signed in successfully",
      data: {
        id: checkUser.id,
        role: checkUser.role,
      },
    });

  } catch (error) {
    console.error("Internal server error", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export function AdminSignOut(req: Request, res: Response) {

  try {
    res.clearCookie("admin-token", {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    })
    return res.status(200).json({
      success: false,
      message: "User signed out"
    })
  } catch (error) {
    console.error("internal server error", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}
