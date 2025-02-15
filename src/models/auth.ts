import { prisma } from "../database/prismaConnection";
import { User } from "../types/authType";

export const register = async (data: User) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                document: data.document as string,
                role: data.role,
                stripeCustomerId: data.stripeCustomerId
            }
        })
        return newUser;
    } catch (error) {
        return false
    }

}

export const login = async (email: string) => {
    const user = await prisma.user.findFirst({ where: { email } })

    return user
}