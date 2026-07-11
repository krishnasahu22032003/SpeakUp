import express from 'express';
import { startServer } from './lib/startServer.js';
import cookieParser from 'cookie-parser';
import UserRouter from './routes/UserRoutes.js';
import AdminRouter from './routes/AdminRoute.js';
import ComplaintRouter from './routes/ComplaintsRoute.js';
import cors from "cors"; 
import HealthRouter from './routes/HealthRoute.js';

const app = express();
app.use(cors({origin:["https://speakup.krishnastack.com"] , credentials:true }))
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/complaints',ComplaintRouter );
app.use('/api/v1/health',HealthRouter );

startServer(app);
