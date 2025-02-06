import { z } from "zod";

export const getcategorySchema = z.object({
    id: z.string({ message: 'Mande o id da categoria' })
})

export const schemaNameCategory = z.object({
    name: z.string({ message: 'Mande o nome da categoria' }).min(2, { message: 'Mande no minimo 2 caracteres' })
})