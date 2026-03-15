import express from "express";
import { UserSignUp } from "../controllers/AutnController.js";

const UserRouter = express.Router();

UserRouter.post("/signup",UserSignUp);

export default UserRouter ; 