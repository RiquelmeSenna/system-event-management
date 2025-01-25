import { z } from "zod";

export const registerSchema = z.object({
    email: z.string({ message: 'Mande um email' }).email({ message: 'Email inválido' }),
    name: z.string({ message: 'Mande um nome' }).min(2, { message: 'Nome muito curto' }),
    password: z.string({ message: 'Mande uma senha' }).min(8, { message: 'No minimo 8 caracteres' }),
    document: z.string({ message: 'Mande um documento' }).length(11, { message: 'CPF/CNPJ inválido' }),
    role: z.enum(['ORGANIZER', 'PARTICIPANT'], { message: 'Papel inválido' }).optional()
})

export const loginSchema = z.object({
    email: z.string({ message: 'Mande um email' }).email({ message: 'Mande um e-mail válido' }),
    password: z.string({ message: 'Mande uma senha' }).min(8, { message: 'No minimo 8 caracteres' })
})