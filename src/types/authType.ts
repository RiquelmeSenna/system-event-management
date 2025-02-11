import { Role } from "@prisma/client"

export type User = {
    name: string,
    password: string,
    email: string,
    role?: Role
    document: string,
}

export type UserUpdate = {
    name?: string,
    password?: string,
    newEmail?: string
}