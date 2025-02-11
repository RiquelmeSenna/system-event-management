import * as modelUser from '../models/user'
import { UserUpdate } from '../types/authType'
import bcrypt from 'bcrypt'

export const getUserByEmail = async (email: string) => {
    const user = await modelUser.getUserByEmail(email)

    if (!user) {
        throw new Error('User not exist')
    }

    return user
}

export const updateUser = async (email: string, { name, newEmail, password }: UserUpdate) => {
    const user = await modelUser.getUserByEmail(email)

    if (!user) {
        throw new Error('User not exist')
    }

    let passwordHash

    if (password) {
        passwordHash = await bcrypt.hash(password, 10)
    }
    const updatedUser = await modelUser.updateUser(email, { name, newEmail, password: passwordHash })

    if (!updatedUser) {
        throw new Error('Cannot update user')
    }

    return updatedUser
}

export const deleteUser = async (email: string) => {
    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error('User not exist')
    }

    const deletedUser = await modelUser.deleteUser(user.id)

    if (!deletedUser) {
        throw new Error('Cannot delete User')
    }

    return deletedUser
}

export const getEventsByUser = async (email: string, skip: number) => {
    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error('User not exist')
    }

    const events = await modelUser.getEventsBuyFromUser(user.id, skip)

    if (!events) {
        throw new Error('error when picking up events')
    }

    return events
}