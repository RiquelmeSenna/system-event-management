import * as cartModel from '../models/cart';
import { getTicket } from '../models/ticket';
import { getUserByEmail } from '../models/user';
import Stripe from 'stripe';


export const addCartTicket = async (ticketId: number, email: string) => {
    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error('User not found')
    }

    if (user.role != "PARTICIPANT") {
        throw new Error('User not allowed to add ticket to cart')
    }

    const ticket = await getTicket(ticketId)

    if (!ticket) {
        throw new Error('Ticket not found')
    }

    const addCart = await cartModel.addCartTicket(user.id, ticket.id)

    return addCart
}

export const checkoutCart = async (email: string) => {
    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error('User not found')
    }
}