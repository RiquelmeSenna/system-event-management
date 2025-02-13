import { Router } from 'express'
import { authMiddleware } from '../middlewares/authJwt'
import * as ticketController from '../controllers/ticketController'

export const TicketRouter = Router()

TicketRouter.post('/', authMiddleware, ticketController.createTicket)
TicketRouter.put('/:id', authMiddleware, ticketController.updatedTicket)
TicketRouter.delete('/:id', authMiddleware, ticketController.deleteTicket)