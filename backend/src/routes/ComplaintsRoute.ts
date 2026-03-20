import express from "express";
import { CreateComplaint } from "../controllers/ComplaintController.js";

const ComplainRouter = express.Router();

ComplainRouter.post("/create" , CreateComplaint) ; 

export default ComplainRouter ; 