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