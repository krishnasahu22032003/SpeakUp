import express from "express";
import { AdminUpdateComplaint, CreateComplaint, DeleteComplaint, GetAdminComplaint, GetUserComplaint, UserUpdateComplaint } from "../controllers/ComplaintController.js";
import { UserAuthMiddleware } from "../middlewares/userAuthMiddleware.js";
import { AdminMiddleware } from "../middlewares/AdminMiddleWare.js";

const ComplaintRouter = express.Router();
ComplaintRouter.use(UserAuthMiddleware);

ComplaintRouter.post("/create" , CreateComplaint);  
ComplaintRouter.get("/user-complaints" ,  GetUserComplaint);  
ComplaintRouter.get("/admin-complaints", AdminMiddleware ,GetAdminComplaint);  
ComplaintRouter.delete("/delete/:id" ,  AdminMiddleware ,DeleteComplaint);  
ComplaintRouter.patch("/admin/update/:id" ,AdminMiddleware,  AdminUpdateComplaint);  
ComplaintRouter.patch("/user/update/:id" , UserAuthMiddleware, UserUpdateComplaint);  


export default ComplaintRouter ; 