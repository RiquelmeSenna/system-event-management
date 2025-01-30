import { RequestHandler, Response } from "express";
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

export const getEvent: RequestHandler = (req, res) => { }

export const getEventsByLocation: RequestHandler = (req, res) => { }

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

export const updateEvent: RequestHandler = (req, res) => { }

export const deleteEvent: RequestHandler = (req, res) => { }

export const searchEvents: RequestHandler = (req, res) => { }
