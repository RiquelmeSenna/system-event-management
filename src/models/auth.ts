import { prisma } from "../database/prismaConnection";
import { User } from "../types/authType";

export const register = async (token: string, data: User) => {
    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            document: data.document as string,
            role: data.role
        }
    })

    return newUser;
}