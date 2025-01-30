import { z } from "zod";

export const eventCreateSchema = z.object({
    name: z.string({ message: 'Mande o nome do eventos' }).min(2, { message: 'Mande no minimo um nome de 2 caracteres' }),
    description: z.string({ message: 'Mande a descrição do evento' }).min(15, { message: 'Descrição de no minimo 15 caracteres' }),
    location: z.string({ message: 'Mande a localização do evento' }),
    date: z.string({ message: 'Mande a data do evento' }),
    maxCapacity: z.number({ message: 'Mande a capacidade maxima do evento' }),
    categoryId: z.number({ message: 'Mande o id da categoria' })
})