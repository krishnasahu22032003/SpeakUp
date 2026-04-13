import express from "express";
import { AdminUpdateComplaint, CreateComplaint, DeleteComplaint, GetAdminComplaint, GetUserComplaint, UserUpdateComplaint } from "../controllers/ComplaintController.js";
import { UserAuthMiddleware } from "../middlewares/userAuthMiddleware.js";
import { AdminMiddleware } from "../middlewares/AdminMiddleWare.js";
import { OptionalUserAuthMiddleware } from "../middlewares/OptionalUserAuthMiddleware.js";

const ComplaintRouter = express.Router();

ComplaintRouter.post("/create",OptionalUserAuthMiddleware ,CreateComplaint);
ComplaintRouter.get("/user-complaints", UserAuthMiddleware, GetUserComplaint);
ComplaintRouter.get("/admin-complaints", UserAuthMiddleware, AdminMiddleware, GetAdminComplaint);
ComplaintRouter.delete("/delete/:id", UserAuthMiddleware, AdminMiddleware, DeleteComplaint);
ComplaintRouter.patch("/admin/update/:id", UserAuthMiddleware, AdminMiddleware, AdminUpdateComplaint);
ComplaintRouter.patch("/user/update/:id", UserAuthMiddleware, UserUpdateComplaint);


export default ComplaintRouter; 