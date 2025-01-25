import { Router } from 'express';
import * as authController from '../controllers/authController';

export const AuthRouter = Router();

AuthRouter.post('/signin', authController.signIn);
AuthRouter.post('/signup', authController.signUp);