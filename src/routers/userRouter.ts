import { Router } from "express";
import { authMiddleware } from "../middlewares/authJwt";
import * as userController from '../controllers/userController'

export const UserRouter = Router()

UserRouter.get('/me', authMiddleware, userController.getUser)
UserRouter.put('/me', authMiddleware, userController.updateUser)
UserRouter.delete('/me', authMiddleware, userController.deleteUser)
UserRouter.get('/me/events', authMiddleware, userController.getEventsUser)