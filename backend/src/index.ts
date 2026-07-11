import express from 'express';
import { startServer } from './lib/startServer.js';
import cookieParser from 'cookie-parser';
import UserRouter from './routes/UserRoutes.js';
import AdminRouter from './routes/AdminRoute.js';
import ComplaintRouter from './routes/ComplaintsRoute.js';
import cors from "cors"; 
import HealthRouter from './routes/HealthRoute.js';

const app = express();
const allowedOrigins = [
  "https://speakup.krishnastack.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming Origin:", origin);

      // Allow requests with no Origin (curl, Postman, health checks)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/complaints',ComplaintRouter );
app.use('/api/v1/health',HealthRouter );

startServer(app);
