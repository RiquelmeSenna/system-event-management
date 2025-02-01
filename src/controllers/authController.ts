import { RequestHandler, Response } from "express";
import * as authSchema from '../validations/auth'
import * as authService from '../services/auth'
import { ExtendRequest } from "../types/extented-request";
import { getUserByEmail } from "../models/user";

export const signUp: RequestHandler = async (req, res) => {
    const safeData = authSchema.registerSchema.safeParse(req.body)
    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const newUser = await authService.register({
            name: safeData.data.name,
            email: safeData.data.email,
            document: safeData.data.document,
            password: safeData.data.password,
            role: safeData.data.role,
        })

        res.status(201).json({
            token: newUser.token,
            User: {
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Usuario já existente' })
    }
}

export const signIn: RequestHandler = async (req, res) => {
    const safeData = authSchema.loginSchema.safeParse(req.body)
    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const user = await authService.login(safeData.data.email, safeData.data.password)
        res.json({
            token: user.token,
            User: {
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Usuario/senha incorreto' })
    }

}