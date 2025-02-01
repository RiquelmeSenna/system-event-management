import { Request } from "express"

export type ExtendRequest = Request & {
    userEmail: string
}