import { Router } from "express";
import { authMiddleware } from "../middlewares/authJwt";
import * as cartController from '../controllers/cartController'

export const cartRouter = Router()

cartRouter.post('/checkout', authMiddleware, cartController.checkout)
cartRouter.post('/:id', authMiddleware, cartController.addCart)