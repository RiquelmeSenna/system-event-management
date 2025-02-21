import { prisma } from "../database/prismaConnection"
import { newTicket, updatedTicket } from "../types/ticketType"

export const createTicket = async (data: newTicket) => {
    const ticket = prisma.ticket.create({ data })

    return ticket
}

export const getTicket = async (id: number) => {
    const ticket = prisma.ticket.findFirst({ where: { id } })

    return ticket
}

export const deleteTickesFromEvent = async (eventId: number) => {
    const ticket = prisma.ticket.deleteMany({
        where: {
            eventId
        }
    })

    return ticket
}

export const updateTicket = async (id: number, data: updatedTicket) => {
    const ticket = prisma.ticket.update({ where: { id }, data })

    return ticket
}

export const deleteTicket = async (id: number) => {
    const ticket = await prisma.ticket.delete({ where: { id } })

    return ticket
}