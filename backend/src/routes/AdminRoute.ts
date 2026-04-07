import express from "express";
import { AdminSignIn, AdminSignOut, AdminSignup, GetAdminDetails } from '../controllers/AdminController.js';
import { AdminMiddleware } from "../middlewares/AdminMiddleWare.js";

const AdminRouter = express.Router();

AdminRouter.post('/signup', AdminSignup);
AdminRouter.post('/signin', AdminSignIn);
AdminRouter.get('/me',AdminMiddleware, GetAdminDetails);
AdminRouter.post('/signout',AdminMiddleware, AdminSignOut);

export default AdminRouter;