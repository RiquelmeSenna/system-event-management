import { Response } from "express";
import { ExtendRequest } from "../types/extented-request";
import { idTicketSchema } from "../validations/ticket";
import * as serviceCart from '../services/cart'

export const addCart = async (req: ExtendRequest, res: Response) => {
    const safeData = idTicketSchema.safeParse(req.params)

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const addCart = await serviceCart.addCartTicket(parseInt(safeData.data.id), req.userEmail)

        res.status(201).json({ addCart: true })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Não foi possivel adicionar ao carrinho' })
    }
}

export const checkout = async (req: ExtendRequest, res: Response) => {
    try {
        const checkout = await serviceCart.checkoutCart(req.userEmail)

        res.status(201).json({ checkout })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Não foi possivel realizar o checkout' })
    }
}