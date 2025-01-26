import { Role } from "@prisma/client"

export type User = {
    name: string,
    password: string,
    email: string,
    role?: Role
    document: string,

}