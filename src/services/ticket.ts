import * as modelTicket from '../models/ticket'
import { newTicket, updatedTicket } from '../types/ticketType'
import { getEvent } from './events'
import { getUserByEmail } from './user'

export const createTicket = async (data: newTicket, email: string) => {
    const event = await getEvent(data.eventId)
    const user = await getUserByEmail(email)

    if (user.id != event.organizerId) {
        throw new Error('Cannot create ticket')
    }

    if (!event) {
        throw new Error('Event not exist')
    }

    if (data.available > data.totalQuantity) {
        throw new Error('Cannot possible available be greater than total')
    }

    const ticket = await modelTicket.createTicket(data)

    if (ticket.type == 'FREE') {
        await modelTicket.updateTicket(ticket.id, { price: 0 })
    }

    return ticket
}

export const updateTicket = async (data: updatedTicket, id: number, email: string) => {
    const ticket = await modelTicket.getTicket(id)

    if (!ticket) {
        throw new Error('Ticket not exist')
    }

    const event = await getEvent(ticket.eventId)
    const user = await getUserByEmail(email)

    if (user.id != event.organizerId) {
        throw new Error('Cannot create ticket')
    }

    if (!event) {
        throw new Error('Event not exist')
    }

    const updatedTicket = await modelTicket.updateTicket(ticket.id, data)

    if (typeof data.totalQuantity === 'number' && data.available as number > data.totalQuantity) {
        throw new Error('Cannot possible available be greater than total')
    }

    if (updatedTicket.type == 'FREE') {
        await modelTicket.updateTicket(ticket.id, { price: 0 })
    }

    return updatedTicket

}

export const deleteTicket = async (id: number, email: string) => {
    const ticket = await modelTicket.getTicket(id)

    if (!ticket) {
        throw new Error('Ticket not exist')
    }

    const event = await getEvent(ticket.eventId)
    const user = await getUserByEmail(email)

    if (user.id != event.organizerId) {
        throw new Error('Cannot create ticket')
    }

    const deletedEvent = await modelTicket.deleteTicket(ticket.id)

    return deletedEvent
}