import express from "express";
import { AdminSignup } from '../controllers/AdminController.js';

const AdminRouter = express.Router();

AdminRouter.post('/signup', AdminSignup);

export default AdminRouter