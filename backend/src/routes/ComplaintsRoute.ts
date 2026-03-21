import express from "express";
import { AdminUpdateComplaint, CreateComplaint, DeleteComplaint, GetAdminComplaint, GetUserComplaint } from "../controllers/ComplaintController.js";
import { AuthMiddleware } from "../middlewares/userAuthMiddleware.js";
import { AdminMiddleware } from "../middlewares/AdminMiddleWare.js";

const ComplaintRouter = express.Router();
ComplaintRouter.use(AuthMiddleware);

ComplaintRouter.post("/create" , CreateComplaint);  
ComplaintRouter.get("/user-complaints" ,  GetUserComplaint);  
ComplaintRouter.get("/admin-complaints", AdminMiddleware ,GetAdminComplaint);  
ComplaintRouter.delete("/delete/:id" ,  AdminMiddleware ,DeleteComplaint);  
ComplaintRouter.patch("/update/:id" ,AdminMiddleware,  AdminUpdateComplaint);  


export default ComplaintRouter ; 