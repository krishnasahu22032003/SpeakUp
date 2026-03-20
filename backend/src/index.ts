import express from 'express';
import { startServer } from './lib/startServer.js';
import cookieParser from 'cookie-parser';
import UserRouter from './routes/UserRoutes.js';
import AdminRouter from './routes/AdminRoute.js';
import ComplainRouter from './routes/ComplaintsRoute.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/complaints',ComplainRouter );

startServer(app);
