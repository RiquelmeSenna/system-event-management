import { RequestHandler } from "express";
import * as authSchema from '../validations/auth'
import * as authService from '../services/auth'

export const signIn: RequestHandler = () => {

}

export const signUp: RequestHandler = async (req, res) => {
    const safeData = authSchema.registerSchema.safeParse(req.body)
    if (!safeData.success) {
        return res.json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const user = await authService.register({
            name: safeData.data.name,
            email: safeData.data.email,
            document: safeData.data.document,
            password: safeData.data.password,
            role: safeData.data.role,
        })

        res.json({ token: { user } })
    } catch (error) {
        console.log(error)
        res.json({ error: 'Ocorreu algum error' })
    }
}