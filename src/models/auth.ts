import { User } from "@prisma/client";
import { prisma } from "../database/prismaConnection";


export const register = async (data: User) => {
    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            document: data.document,
            role: data.role,
        }
    })

    return newUser;
}