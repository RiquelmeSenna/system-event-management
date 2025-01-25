import jwt from 'jsonwebtoken'

export const jwtSing = (email: string) => {
    return jwt.sign(email, process.env.JWT_SECRET as string)
}