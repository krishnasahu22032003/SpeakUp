import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { CreateComplaintSchema, AdminupdateComplaintSchema, UserUpdateComplaintSchema } from "../schemas/complaintSchema.js";
import { v4 as uuidv4 } from 'uuid';

export async function CreateComplaint(req: Request, res: Response) {

    const ComplaintData = CreateComplaintSchema.safeParse(req.body);

    if (!ComplaintData.success) {
        return res.status(400).json({
            success: false,
            message: "invalid input",
            error: ComplaintData.error.flatten()
        })
    };

    const { title, description, longitude, latitude, image, type, location } = ComplaintData.data;

    try {

        const Complaint = await prisma.complaint.create({
            data: {
                title,
                description,
                ...(req.user && { userId: req.user.id }),
                type,
                ...(latitude !== undefined && { latitude }),
                ...(longitude !== undefined && { longitude }),
                ...(image !== undefined && { image }),
                ...(location !== undefined && { location }),
                complaintId: uuidv4()

            }
        });
        if (!Complaint) {
            return res.status(400).json({
                success: false,
                message: "Complaint not created"
            })
        };
        return res.status(201).json({
            success: true,
            message: "Complaint created",
            data: Complaint
        })


    } catch (error) {

        console.error("Error while creating complaint:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error "
        })
    }
}

export async function GetUserComplaint(req: Request, res: Response) {

    if (!req.user || !req.user.id) {
        return res.status(401).json({
            success: false,
            message: "User does not exists"
        })
    };

    try {

        const complaint = await prisma.complaint.findMany({
            where: {
                userId: req.user.id
            },

            orderBy: {
                createdAt: "desc"
            }
        });

        if (complaint.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No complaints found"
            })
        };

        return res.status(200).json({
            success: true,
            message: "User complaints fetched successfully",
            data: complaint
        });

    } catch (error) {
        console.error("Error while getting the complaints:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    };
}

export async function GetAdminComplaint(req: Request, res: Response) {

    if (!req.user || !req.user.id || req.user.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Unauthorized"
        })
    };

    try {
        const page = Math.max(Number(req.query.page) || 1, 1)
        const limit = Math.min(Number(req.query.limit) || 10, 50)
        const skip = (page - 1) * limit;

        const [complaint, total] = await Promise.all([
            prisma.complaint.findMany({
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc"
                },
            }),
            prisma.complaint.count()
        ])
        return res.status(200).json({
            success: true,
            message: complaint.length > 0
                ? "Complaints fetched successfully"
                : "No complaints found",
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: complaint
        });

    } catch (error) {
        console.error("Error while fetching the complaints:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    };
}

export async function DeleteComplaint(req: Request, res: Response) {

    if (!req.user?.id || req.user.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Forbidden"
        });
    }

    const id = req.params.id as string;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Complaint ID is required"
        });
    }

    try {
        await prisma.complaint.delete({
            where: {
                id
            }
        });

        return res.status(200).json({
            success: true,
            message: "Complaint deleted successfully"
        });

    } catch (error: any) {
        console.error("Error while deleting the complaint", error);

        if (error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export async function AdminUpdateComplaint(req: Request, res: Response) {

    if (!req.user || !req.user.id || req.user.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Unauthorized"
        })
    };
    const id = req.params.id as string
    const parsedData = AdminupdateComplaintSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json({
            success:false,
            message:"Invalid input"
        })
    };
   const {status , updatedAt} = parsedData.data ; 
    try {
        const result = await prisma.complaint.updateMany({
            where: {
                complaintId: id,
                updatedAt: new Date(updatedAt)
            },
            data: {
                status,

            }
        });
        if (result.count === 0) {
            return res.status(409).json({
                success: false,
                message:
                    "This complaint was already updated by another admin. Please refresh.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Complaint status updated successfully",
        });

    } catch (error) {
        console.error("Error while Updating:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

export async function UserUpdateComplaint(req:Request,res:Response){

if(!req.user || !req.user.id || req.user.role !== "USER"){
    return res.status(403).json({
        success:false,
        message:"Unauthorized"
    })
};

const parsedData = UserUpdateComplaintSchema.safeParse(req.body);

if(!parsedData.success){
    return res.status(400).json({
        success:false,
        message:"Invalid input"
    })
};

const {title , description ,location , latitude , longitude ,image , type}  = parsedData.data ; 
const complaintId = req.params.id as string ; 
try{
const updateComplaint = await prisma.complaint.updateMany({
    where:{
 id:complaintId,
 userId:req.user.id
    },
    data:{
        ...(title !== undefined && {title} ) ,
       ...(description !== undefined && {description}),
        ...(location !== undefined && {location}),
        ...(latitude !== undefined && {latitude}),
        ...(longitude !== undefined && {longitude}),
        ...(image !== undefined && {image}),
        ...(type !== undefined && {type})
    }
});
if(updateComplaint.count === 0){
     return res.status(404).json({
    success: false,
    message: "Complaint not found or not authorized"
  });
}

return res.status(200).json({
    success:true,
    message:"Updated complaint successfully",
    data:updateComplaint
})
}catch(error){
    console.error("Error while updating:" , error);
    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
};
};