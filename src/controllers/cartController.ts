import { Response } from "express";
import { ExtendRequest } from "../types/extented-request";
import { idTicketSchema } from "../validations/ticket";
import * as serviceCart from '../services/cart'
import { handleCheckoutCompleted, stripe } from "../utils/stripe";

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
        res.status(200).json({ checkout })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Não foi possivel realizar o checkout' })
    }
}

export const WebHook = async (req: ExtendRequest, res: Response) => {
    const pagment = req.headers['stripe-signature'] as string

    let event
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            pagment,
            process.env.STRIPE_WEBHOOK_SECRET as string
        )

        console.log('1 teste controller certo')
    } catch (error) {
        console.log('2 teste controller error')
        return res.status(400).send(`Webhook Error`)
    }

    switch (event.type) {
        case 'checkout.session.completed':
            console.log('3 teste controller certo')
            await handleCheckoutCompleted(event)
            break;
        default:
            console.log(`Unhandled event type ${event.type}`)
    }
    console.log('4 teste controller certo')
    res.send()
}