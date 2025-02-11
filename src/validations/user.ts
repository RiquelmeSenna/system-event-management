import { z } from "zod";

export const updateUserSchema = z.object({
    name: z.string().min(2, { message: 'Minimo de 2 carecteres' }).optional(),
    email: z.string().email({ message: 'Mande um email válido' }).optional(),
    password: z.string().min(8, { message: 'No minimo 8 caracteres' }).optional()
})