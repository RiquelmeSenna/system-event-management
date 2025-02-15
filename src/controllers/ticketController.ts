import { Response } from 'express'
import { ExtendRequest } from '../types/extented-request'
import * as ticketSchema from '../validations/ticket'
import * as ticketService from '../services/ticket'
import { createStripePayment } from '../utils/stripe'


export const createTicket = async (req: ExtendRequest, res: Response) => {
    const safeData = ticketSchema.newticketSchema.safeParse(req.body)

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const stripePayment = await createStripePayment(safeData.data.name, safeData.data.price)

        const newTicket = await ticketService.createTicket({
            available: safeData.data.available,
            eventId: safeData.data.eventId,
            name: safeData.data.name,
            price: safeData.data.price,
            totalQuantity: safeData.data.totalQuantity,
            type: safeData.data.type,
            stripeProductId: stripePayment.id
        }, req.userEmail)

        res.status(201).json({ newTicket })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Error ao criar ticket para o evento' })
    }
}

export const updatedTicket = async (req: ExtendRequest, res: Response) => {
    const safeData = ticketSchema.updateTicketScheam.safeParse(req.body)
    const safeDataParams = ticketSchema.idTicketSchema.safeParse(req.params)

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    if (!safeDataParams.success) {
        return res.status(400).json({ error: safeDataParams.error.flatten().fieldErrors })
    }

    try {
        const updatedTicket = await ticketService.updateTicket({
            available: safeData.data.available,
            name: safeData.data.name,
            price: safeData.data.price,
            totalQuantity: safeData.data.totalQuantity,
            type: safeData.data.type
        }, parseInt(safeDataParams.data.id), req.userEmail)

        res.status(202).json({ updatedTicket })
    } catch (error) {
        res.status(400).json({ error: 'Não foi possivel atualizar o ticket' })
    }
}

export const deleteTicket = async (req: ExtendRequest, res: Response) => {
    const safeData = ticketSchema.idTicketSchema.safeParse(req.params)

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const deletedEvent = await ticketService.deleteTicket(parseInt(safeData.data.id), req.userEmail)

        res.json({ Deleted: true })
    } catch (error) {
        res.status(400).json({ error: 'Não foi possivel deletar' })
    }
}