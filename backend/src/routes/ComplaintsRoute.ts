import express from "express";
import { AdminUpdateComplaint, CreateComplaint, DeleteComplaint, GetAdminComplaint, GetUserComplaint, UserUpdateComplaint } from "../controllers/ComplaintController.js";
import { UserAuthMiddleware } from "../middlewares/userAuthMiddleware.js";
import { AdminMiddleware } from "../middlewares/AdminMiddleWare.js";
import { OptionalUserAuthMiddleware } from "../middlewares/OptionalUserAuthMiddleware.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

const ComplaintRouter = express.Router();

ComplaintRouter.post("/create",OptionalUserAuthMiddleware ,CreateComplaint);
ComplaintRouter.get("/user-complaints", UserAuthMiddleware, GetUserComplaint);
ComplaintRouter.get("/admin-complaints", AdminMiddleware, GetAdminComplaint);
ComplaintRouter.delete("/delete/:id", AuthMiddleware, DeleteComplaint);
ComplaintRouter.patch("/admin/update/:id", AdminMiddleware, AdminUpdateComplaint);
ComplaintRouter.patch("/user/update/:id", UserAuthMiddleware, UserUpdateComplaint);

export default ComplaintRouter; 