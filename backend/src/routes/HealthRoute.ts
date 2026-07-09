import express from "express" ;
import healthCheck from "../controllers/HealthController.js";

const HealthRouter = express.Router();

HealthRouter.get("/check" , healthCheck) ;

export default HealthRouter ;