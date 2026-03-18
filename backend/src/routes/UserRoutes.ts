import express from 'express';
import { UserSignIn, UserSignUp, UserSignOut, UpdateUserDetails, getUserDetails } from '../controllers/AutnController.js';
import { AuthMiddleware } from '../middlewares/userAuthMiddleware.js';

const UserRouter = express.Router();

UserRouter.post('/signup', UserSignUp);
UserRouter.post('/signin', UserSignIn);
UserRouter.post('/logout', AuthMiddleware, UserSignOut);
UserRouter.patch('/update', AuthMiddleware, UpdateUserDetails);
UserRouter.get('/me', AuthMiddleware, getUserDetails);

export default UserRouter;
