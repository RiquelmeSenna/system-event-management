import { Event } from '@prisma/client'
import * as modelEvent from '../models/events'
import { getUserByEmail } from '../models/user'
import { UpdateEvent } from '../types/eventType'

export const getEvents = async (skip: number) => {
    const events = await modelEvent.getEvents(skip)

    if (events === null || events === undefined) {
        throw new Error("Don't have more Events")
    }



    return events
}

export const getEvent = async (id: number, email: string) => {
    const event = await modelEvent.getEvent(id)
    const organizer = await getUserByEmail(email)


    if (!event) {
        throw new Error("Event not exist")
    }

    if (event.active == false && organizer?.id != event.organizerId) {
        throw new Error("Event is not available")
    }

    return event
}

export const getEventLocal = async (local: string, skip: number) => {
    const event = await modelEvent.getEventLocal(local, skip)

    if (event == null || event == undefined) {
        throw new Error("There is no event at this location")
    }

    return event
}

export const getEventByName = async (name: string) => {
    const events = await modelEvent.getEventByName(name)

    if (events == null || events == undefined) {
        throw new Error("There is no event with this name")
    }
}

export const addEvent = async (data: Event, email: string) => {
    const newEvent = await modelEvent.addEvent(data)
    const organizer = await getUserByEmail(email)

    if (organizer?.role != 'ORGANIZER') {
        throw new Error('Not possible create the event')
    }

    return newEvent
}

export const updateEvent = async (data: UpdateEvent, id: number, email: string) => {
    const updatedEvent = await modelEvent.updateEvent(data, id)
    const organizer = await getUserByEmail(email)

    if (organizer?.id != updatedEvent.organizerId) {
        throw new Error('Not possible create the event')
    }

    if (organizer?.role != 'ORGANIZER') {
        throw new Error('Not possible create the event')
    }
}

export const deleteEvent = async (id: number, email: string) => {
    const deletedEvent = await modelEvent.deleteEvent(id)
    const organizer = await getUserByEmail(email)

    if (organizer?.id != deletedEvent.organizerId) {
        throw new Error('Only the organizer can delete this event')
    }

    if (deletedEvent.active == true) {
        throw new Error('Disable the event before deleting')
    }

    return deletedEvent
}
