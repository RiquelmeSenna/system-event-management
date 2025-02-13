import { z } from "zod";

export const newticketSchema = z.object({
    type: z.enum(['FREE', 'PAID'], { message: 'Mande o tipo de ingresso' }),
    price: z.number({ message: 'Mande o preço do ingresso' }),
    name: z.string({ message: 'Mande o nome do ingresso' }).min(2, { message: 'No minimo de 2 caracteres' }),
    totalQuantity: z.number({ message: 'Mande o numero total de ingressos' }).min(1),
    available: z.number({ message: 'Mande a quantidade disponivel de ingresso' }),
    eventId: z.number({ message: 'Mande o id do evento' })
})

export const updateTicketScheam = z.object({
    type: z.enum(['FREE', 'PAID']).optional(),
    price: z.number().optional(),
    name: z.string().min(2, { message: 'No minimo de 2 caracteres' }).optional(),
    totalQuantity: z.number().min(1).optional(),
    available: z.number().optional(),
})

export const idTicketSchema = z.object({
    id: z.string({ message: 'Mande o id' })
})