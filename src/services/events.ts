import { v4 } from 'uuid'
import * as modelEvent from '../models/events'
import { getUserByEmail } from '../models/user'
import { CreateEvent, UpdateEvent } from '../types/eventType'
import sharp from 'sharp'
import fs from 'fs/promises'
import { deleteTickesFromEvent } from '../models/ticket'

export const getEvents = async (skip: number) => {
    const events = await modelEvent.getEvents(skip)

    if (!events || events.length === 0) {
        throw new Error("Don't has more Events")
    }

    return events
}

export const getEvent = async (id: number) => {
    const event = await modelEvent.getEvent(id)
    if (!event) {
        throw new Error("Event not exist")
    }

    return event
}

export const getEventLocal = async (local: string, skip: number) => {
    const event = await modelEvent.getEventLocal(local, skip)

    if (event.length < 1) {
        throw new Error("There is no event at this location")
    }

    return event
}

export const getEventByName = async (name: string, skip: number) => {
    const events = await modelEvent.getEventsByName(name, skip)

    if (events.length < 1) {
        throw new Error("There is no event with this name")
    }

    return events
}

export const getTicketFromEvent = async (id: number) => {
    const event = await modelEvent.getEvent(id)

    if (!event) {
        throw new Error('Event not exist')
    }

    const ticket = await modelEvent.getTicketsFromEvent(id)

    return ticket
}

export const getEventOrganizer = async (id: number, email: string) => {
    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error('User not exist')
    }

    const event = await modelEvent.getEventOrganizer(id, user?.id as number)

    if (!event) {
        throw new Error('Event not exist')
    }

    return event
}

export const getEventsByOrganizer = async (email: string, skip: number) => {
    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error('User not exist')
    }

    const events = await modelEvent.getEventsByOrganizer(user.id, skip)

    if (events.length < 1) {
        throw new Error('There is no event for this organizer')
    }

    return events
}

export const handleRawPhoto = async (tmpPath: string) => {
    const newNameFile = v4() + '.jpg'

    const image = await sharp(tmpPath)
        .resize(400, 400, { fit: 'cover' })
        .toBuffer()

    await sharp(tmpPath)
        .toFile('./public/images/' + newNameFile)

    try {
        await fs.unlink(tmpPath);
    } catch (error: any) {
        console.error(`Erro ao apagar o arquivo temporário: ${error.message}`);
    }

    return newNameFile

}


export const addEvent = async (data: CreateEvent, email: string) => {
    const organizer = await getUserByEmail(email)

    if (organizer?.role != 'ORGANIZER') {
        throw new Error('Not possible create the event')
    }

    const newEvent = await modelEvent.addEvent(data, organizer.id as number)

    return newEvent
}

export const updateEvent = async (data: UpdateEvent, id: number, email: string) => {
    const event = await modelEvent.getEvent(id)
    const organizer = await getUserByEmail(email)

    if (!event) {
        throw new Error('The event not exist')
    }

    if (organizer?.id != event.organizerId) {
        throw new Error('Only the organizer can update this event')
    }

    if (organizer?.role != 'ORGANIZER') {
        throw new Error('Cannot update event')
    }

    const updatedEvent = await modelEvent.updateEvent(data, id)

    return updatedEvent
}

export const deleteEvent = async (id: number, email: string) => {
    const event = await modelEvent.getEvent(id)
    const organizer = await getUserByEmail(email)

    if (!event) {
        throw new Error('The event not exist')
    }

    if (organizer?.id != event.organizerId) {
        throw new Error('Only the organizer can delete this event')
    }

    if (event.active === true) {
        throw new Error('Disable the event before deleting')
    }

    await deleteTickesFromEvent(id)

    const deletedEvent = await modelEvent.deleteEvent(id)

    return deletedEvent
}
