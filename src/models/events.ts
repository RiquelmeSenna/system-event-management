import { Event } from "@prisma/client"
import { prisma } from "../database/prismaConnection"

export const getEvents = async (skip: number) => {
    const events = await prisma.event.findMany({
        where: {
            active: true
        },
        orderBy: {
            revenue: 'asc'
        },
        skip: skip * 8,
        take: 8
    })
}


export const getEvent = async (id: number) => {
    const event = await prisma.event.findFirst({
        where: {
            id
        }
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
}

export const addEvent = async (data: Event) => {
    const newEvent = await prisma.event.create({
        data
    })
}