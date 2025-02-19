import { raw, Router } from "express";
import { WebHook } from "../controllers/cartController";

export const webhookRouter = Router()

webhookRouter.post('/', raw({ type: 'application/json' }), WebHook)