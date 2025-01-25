import { Router } from 'express';
import * as authController from '../controllers/authController';

const AuthRouter = Router();

AuthRouter.post('/login', authController.signIn);
AuthRouter.post('/register', authController.signUp);