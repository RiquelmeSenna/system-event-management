import { beforeAll, describe, expect, test } from "@jest/globals"
import * as serviceUser from "./user"
import { register } from "./auth"
import { createStripeCustomer } from "../utils/stripe"
import { User } from "../types/authType"
import { createUsertest } from "../utils/objectsTest"

describe('Should test all user services', () => {
    let newUser: User

    beforeAll(async () => {
        newUser = await createUsertest()

        await register(newUser)
    })
    test("Should find user by email", async () => {
        const user = await serviceUser.getUserByEmail(newUser.email)

        expect(user.name).toBe('Testador')
        expect(user.stripeCustomerId).not.toBeUndefined()
        expect(user.role).toBe('PARTICIPANT')
    })

    test("Shouldn't find user because not exist", () => {
        expect(async () => {
            await serviceUser.getUserByEmail('riquelmenotexist@gmail.com')
        }).rejects.toThrow('User not exist')
    })

    test('Should update user only name', async () => {
        const updatedUser = await serviceUser.updateUser(newUser.email, { name: 'Riquelme Pastor' })

        expect(updatedUser.name).toBe('Riquelme Pastor')
        expect(updatedUser.email).toBe(newUser.email)
    })


    test('Should delete User', async () => {
        const deletedUser = await serviceUser.deleteUser(newUser.email)

        expect(deletedUser).toBeDefined()
        expect(deletedUser).toHaveProperty('id')

        expect(async () => {
            const event = await serviceUser.getUserByEmail(newUser.email)
        }).rejects.toThrow('User not exist')
    })
})