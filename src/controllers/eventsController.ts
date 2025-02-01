import e, { RequestHandler, Response } from "express";
import * as eventService from '../services/events'
import * as eventValidation from '../validations/events'
import { ExtendRequest } from "../types/extented-request";

export const getEvents: RequestHandler = async (req, res) => {
    const { skip } = req.query

    try {
        const events = await eventService.getEvents(parseInt(skip as string))

        res.json({ events })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Não foi possivel encontrar os eventos ' })
    }
}

export const getEvent: RequestHandler = async (req, res) => {
    const safeData = eventValidation.getOneEventSchema.safeParse(req.params)

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }
    try {
        const event = await eventService.getEvent(parseInt(safeData.data.id))

        res.json({
            event: {
                name: event.name,
                description: event.description,
                location: event.location,
                date: event.date,
                maxCapcity: event.maxCapacity,
                category: event.category.name
            }
        })
    } catch (error) {
        res.status(400).json({ error: 'Aconteceu algum error' })
    }
}

export const getEventsByLocation: RequestHandler = async (req, res) => {
    const safeData = eventValidation.getEventByLocalSchema.safeParse(req.params)
    const { skip } = req.query

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const events = await eventService.getEventLocal(safeData.data.local, parseInt(skip as string))

        res.json({ events })
    } catch (error) {
        res.status(400).json({ error: 'Não há eventos neste local :(' })
    }
}
export const searchEvents: RequestHandler = async (req, res) => {
    const safeData = eventValidation.getEventsByName.safeParse(req.params)
    const { skip } = req.query

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const events = await eventService.getEventByName(safeData.data.name, parseInt(skip as string))

        res.json({ events })
    } catch (error) {
        res.status(400).json({ error: 'Não há eventos com este nome' })
    }
}

export const createEvent = async (req: ExtendRequest, res: Response) => {
    const safeData = eventValidation.eventCreateSchema.safeParse(req.body)
    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const newEvent = await eventService.addEvent({
            name: safeData.data.name,
            description: safeData.data.description,
            location: safeData.data.location,
            date: new Date(safeData.data.date),
            maxCapacity: safeData.data.maxCapacity,
            categoryId: safeData.data.categoryId,
        }, req.userEmail)

        res.status(201).json({ newEvent })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Não foi possivel criar o evento' })
    }
}

export const updateEvent = async (req: ExtendRequest, res: Response) => {
    const safeData = eventValidation.getOneEventSchema.safeParse(req.params)
    const safeDataBody = eventValidation.eventUpdateSchema.safeParse(req.body)
    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }
    if (!safeDataBody.success) {
        return res.status(400).json({ error: safeDataBody.error.flatten().fieldErrors })
    }

    try {
        const updatedEvent = await eventService.updateEvent({
            active: safeDataBody.data.active,
            categoryId: safeDataBody.data.categoryId,
            date: safeDataBody.data.date ? new Date(safeDataBody.data.date) : undefined,
            description: safeDataBody.data.description,
            location: safeDataBody.data.location,
            maxCapacity: safeDataBody.data.maxCapacity,
            name: safeDataBody.data.name
        }, parseInt(safeData.data.id), req.userEmail)

        res.status(206).json({ updatedEvent })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Não foi possivel atualizar' })
    }
}

export const deleteEvent = async (req: ExtendRequest, res: Response) => {
    const safeData = eventValidation.getOneEventSchema.safeParse(req.params)

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const deletedEvent = await eventService.deleteEvent(parseInt(safeData.data.id), req.userEmail)

        res.status(200).json({ deletedEvent })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Não foi possivel deletar' })
    }
}

