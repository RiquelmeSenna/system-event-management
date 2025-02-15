import { prisma } from "../database/prismaConnection"

export const addCartTicket = async (id: number, ticketId: number) => {
    const addCart = await prisma.user.update({
        where: { id }, data: { ticketId: ticketId }
    })

    return addCart
}

export const checkoutCart = async (id: number, ticketId: number) => {
    const checkout = await prisma.user.update({
        where: { id, ticketId }, data: { ticketId: null }
    })

    const ticketBuy = await prisma.ticket.update({
        where: { id: ticketId },
        data: {
            available: -1
        }
    })

    return { checkout, ticketBuy }
}