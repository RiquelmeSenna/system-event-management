import { prisma } from "../database/prismaConnection"
import { UserUpdate } from "../types/authType"

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({ where: { email } })
    return user
}

export const updateUser = async (email: string, { newEmail, password, name }: UserUpdate) => {
    const user = await prisma.user.update(
        {
            where: { email },
            data: {
                name,
                password,
                email: newEmail,
                updatedAt: new Date()
            }
        }
    )
    return user
}

export const deleteUser = async (id: number) => {
    const deletedUser = await prisma.user.delete({ where: { id } })

    return deletedUser
}

export const getEventsBuyFromUser = async (id: number, skip: number) => {
    const eventsUser = await prisma.user.findFirst({
        where: { id },
        select: {
            Event: {
                select: {
                    Image: true,
                    name: true,
                    active: true,
                    date: true,
                    location: true,
                }
            }
        },
        skip: skip ? (skip - 1) * 8 : 0,
        take: 8
    })

    return eventsUser
}