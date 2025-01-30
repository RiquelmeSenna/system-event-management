import { NextFunction, RequestHandler, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ExtendRequest } from '../types/extented-request'
import { getUserByEmail } from '../models/user'

export const jwtSing = (email: string) => {
    return jwt.sign(email, process.env.JWT_SECRET as string)
}

export const authMiddleware = async (req: ExtendRequest, res: Response, next: NextFunction) => {
    const header = req.headers['authorization']
    if (!header) {
        return res.json({ error: 'Mande um header de autorização' })
    }

    const token = header.split(' ')[1]
    const verify = jwt.verify(token, process.env.JWT_SECRET as string,
        async (error: any, decoded: any) => {
            if (error) return res.status(401).json({ error: 'Mande um token válido' })
            try {
                const email = decoded.email
                const user = await getUserByEmail(email)
                if (!user) {
                    return res.json({ error: 'Usuario não encontrado' })
                }

                req.userEmail = user.email
                next()
            } catch (error) {
                res.status(401).json({ error: 'Token inválido' })
            }
        }
    )
}
