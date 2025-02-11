import { Response } from "express";
import { ExtendRequest } from "../types/extented-request";
import * as serviceUser from '../services/user'
import * as schemaUser from '../validations/user'

export const getUser = async (req: ExtendRequest, res: Response) => {
    try {
        const user = await serviceUser.getUserByEmail(req.userEmail)
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(400).json({ error: 'Error ao encontrar o usuario' })
    }
}

export const updateUser = async (req: ExtendRequest, res: Response) => {
    const safeData = schemaUser.updateUserSchema.safeParse(req.body)
    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const updatedUser = await serviceUser.updateUser(req.userEmail, {
            name: safeData.data.name,
            newEmail: safeData.data.email,
            password: safeData.data.password as string
        })

        res.status(202).json({ user: updatedUser })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Erro ao atualizar o user' })
    }
}

export const deleteUser = async (req: ExtendRequest, res: Response) => {
    try {
        const deletedUser = await serviceUser.deleteUser(req.userEmail)

        res.json({ DeletedUser: true })
    } catch (error) {
        res.status(400).json({ error: 'Não foi possivel deletar o seu usuario!' })
    }
}

export const getEventsUser = async (req: ExtendRequest, res: Response) => {
    const { skip } = req.query

    try {
        const events = await serviceUser.getEventsByUser(req.userEmail, parseInt(skip as string))

        res.json({ events })
    } catch (error) {
        res.status(400).json({ error: 'Error ao pegar os eventos do usuario' })
    }
}