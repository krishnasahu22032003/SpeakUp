import express from "express";
import { AdminSignup, GetAdminDetails } from '../controllers/AdminController.js';

const AdminRouter = express.Router();

AdminRouter.post('/signup', AdminSignup);
AdminRouter.get('/me', GetAdminDetails);

export default AdminRouter