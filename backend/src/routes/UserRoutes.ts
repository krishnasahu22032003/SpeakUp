import express from 'express';
import { UserSignIn, UserSignUp } from '../controllers/AutnController.js';

const UserRouter = express.Router();

UserRouter.post('/signup', UserSignUp);
UserRouter.post('/signin', UserSignIn);

export default UserRouter;
