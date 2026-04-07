import express from "express";
import { AdminSignup, GetAdminDetails } from '../controllers/AdminController.js';
import { AdminMiddleware } from "../middlewares/AdminMiddleWare.js";
import { UserAuthMiddleware } from "../middlewares/userAuthMiddleware.js";

const AdminRouter = express.Router();

AdminRouter.post('/signup', AdminSignup);
AdminRouter.post('/signin', AdminSignup);
AdminRouter.get('/me',UserAuthMiddleware,AdminMiddleware, GetAdminDetails);

export default AdminRouter