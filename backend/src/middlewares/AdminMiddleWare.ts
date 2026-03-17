import type { Request,Response,NextFunction } from "express";


export function AdminMiddleware(req:Request,res:Response,next:NextFunction){


    if(!req.user || !req.user.id){
    return res.status(401).json({
        success:false,
         message: "Unauthorized",
    })
};

if(req.user.role !== "ADMIN"){
    return res.status(403).json({
        success:false,
        message:"Only Admins Allowed"
    })
}

next()

}

