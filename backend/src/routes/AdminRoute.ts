import express from "express";
import { AdminSignup, GetAdminDetails } from '../controllers/AdminController.js';
import { AdminMiddleware } from "../middlewares/AdminMiddleWare.js";
import { AuthMiddleware } from "../middlewares/userAuthMiddleware.js";

const AdminRouter = express.Router();

AdminRouter.post('/signup', AdminSignup);
AdminRouter.post('/signin', AdminSignup);
AdminRouter.get('/me',AuthMiddleware,AdminMiddleware, GetAdminDetails);

export default AdminRouter