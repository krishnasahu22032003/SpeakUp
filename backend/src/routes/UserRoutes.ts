import express from 'express';
import { UserSignIn, UserSignUp, UserSignOut, UpdateUserDetails, getUserDetails } from '../controllers/AuthController.js';
import { UserAuthMiddleware } from '../middlewares/userAuthMiddleware.js';

const UserRouter = express.Router();

UserRouter.post('/signup', UserSignUp);
UserRouter.post('/signin', UserSignIn);
UserRouter.post('/logout', UserAuthMiddleware, UserSignOut);
UserRouter.patch('/update', UserAuthMiddleware, UpdateUserDetails);
UserRouter.get('/me', UserAuthMiddleware, getUserDetails);

export default UserRouter;
