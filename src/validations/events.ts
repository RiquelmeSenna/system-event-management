import { z } from "zod";

export const eventCreateSchema = z.object({
    name: z.string({ message: 'Mande o nome do eventos' }).min(2, { message: 'Mande no minimo um nome de 2 caracteres' }),
    description: z.string({ message: 'Mande a descrição do evento' }).min(15, { message: 'Descrição de no minimo 15 caracteres' }),
    location: z.string({ message: 'Mande a localização do evento' }),
    date: z.string({ message: 'Mande a data do evento' }),
    maxCapacity: z.number({ message: 'Mande a capacidade maxima do evento' }),
    categoryId: z.number({ message: 'Mande o id da categoria' })
})

export const getOneEventSchema = z.object({
    id: z.string({ message: 'Mande um id' })
})

export const getEventByLocalSchema = z.object({
    local: z.string({ message: 'Mande um local' }).min(2, { message: 'Mande no minimo 2 caracteres' })
})

export const getEventsByName = z.object({
    name: z.string({ message: 'Mande um nome' }).min(2, { message: 'No minimo de 2 caracteres' })
})

export const eventUpdateSchema = z.object({
    name: z.string().min(2, { message: 'Mande no minimo um nome de 2 caracteres' }).optional(),
    description: z.string().min(15, { message: 'Descrição de no minimo 15 caracteres' }).optional(),
    location: z.string().min(2, { message: 'Mande no minimo 2 caracteres' }).optional(),
    date: z.string().optional(),
    maxCapacity: z.number().optional(),
    categoryId: z.number().optional(),
    active: z.boolean().optional()
})