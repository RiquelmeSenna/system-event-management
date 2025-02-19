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
            available: {
                decrement: 1
            }
        }
    })

    const participantEvent = await prisma.participantEvent.create({
        data: {
            eventId: ticketBuy.eventId,
            participantId: id,
            ticketType: ticketBuy.type,
        }
    })

    const updateEvent = await prisma.event.update({
        where: { id: ticketBuy.eventId },
        data: {
            revenue: {
                increment: ticketBuy.price
            },
            participants: {
                increment: 1
            }
        }
    })

    return { checkout, ticketBuy, participantEvent, updateEvent }
}