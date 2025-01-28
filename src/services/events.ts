import * as modelEvent from '../models/events'

export const getEvents = async (skip: number) => {
    const events = await modelEvent.getEvents(skip)

    if (events === null || events === undefined) {
        throw new Error("Don't have more Events")
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

    if (event == null || event == undefined) {
        throw new Error("There is no event at this location")
    }

    return event
}