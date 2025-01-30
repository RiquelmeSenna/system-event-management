import { Event } from "@prisma/client"
import { prisma } from "../database/prismaConnection"
import { CreateEvent, UpdateEvent } from "../types/eventType"

export const getEvents = async (skip: number) => {
    const events = await prisma.event.findMany({
        where: {
            active: true,
        },
        orderBy: {
            revenue: 'asc'
        },

        skip: skip ? (skip - 1) * 8 : 0,
        take: 8,
        select: {
            name: true,
            description: true,
            maxCapacity: true,
            location: true,
            date: true,
            category: { select: { name: true } }
        }
    })

    return events
}


export const getEvent = async (id: number) => {
    const event = await prisma.event.findFirst({
        where: { id }
    })

    return event
}


export const getEventLocal = async (local: string, skip: number) => {
    const events = await prisma.event.findMany({
        where: {
            location: local
        },
        skip: skip * 8,
        take: 8
    })

    return events
}

export const getEventByName = async (name: string) => {
    const event = await prisma.event.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        }
    })
}

export const addEvent = async (data: CreateEvent, organizerId: number) => {
    const newEvent = await prisma.event.create({
        data: {
            ...data,
            organizerId
        }
    })

    return newEvent
}

export const updateEvent = async (data: UpdateEvent, id: number) => {
    const updatedEvent = await prisma.event.update({ data, where: { id } })

    return updatedEvent
}

export const deleteEvent = async (id: number) => {
    const deletedEvent = await prisma.event.delete({ where: { id } })

    return deletedEvent
}