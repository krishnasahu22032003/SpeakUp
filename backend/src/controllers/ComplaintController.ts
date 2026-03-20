import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { CreateComplaintSchema } from "../schemas/complaintSchema.js";
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
            data:Complaint
        })


    } catch (error) {

        console.error("Error while creating complaint:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error "
        })
    }
}