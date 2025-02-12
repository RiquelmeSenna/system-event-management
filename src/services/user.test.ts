import { beforeAll, describe, expect, test } from '@jest/globals'
import * as serviceUser from './user'
import { register } from './auth'

describe('Should test all user services', () => {

    beforeAll(async () => {
        const newUser = await register({
            document: '06955734112',
            email: 'riquelmestayler@gmail.com',
            name: 'Riquelme Testador',
            password: 'Flamengo98!',
            role: 'PARTICIPANT'
        })
    })
    test("Should find user by email", async () => {
        const user = await serviceUser.getUserByEmail('riquelmestayler@gmail.com')

        expect(user.name).toBe('Riquelme Testador')
        expect(user.role).toBe('PARTICIPANT')
    })

    test("Shouldn't find user because not exist", () => {
        expect(async () => {
            await serviceUser.getUserByEmail('riquelmenotexist@gmail.com')
        }).rejects.toThrow('User not exist')
    })

    test('Should update user only name', async () => {
        const updatedUser = await serviceUser.updateUser('riquelmestayler@gmail.com', { name: 'Riquelme Pastor' })

        expect(updatedUser.name).toBe('Riquelme Pastor')
        expect(updatedUser.email).toBe('riquelmestayler@gmail.com')
    })
    test('Should get events by user', async () => {
        const events = await serviceUser.getEventsByUser('riquelmestayler@gmail.com', 1)

        expect(events).not.toBeUndefined()
    })
})

test('Should delete User', async () => {
    const deletedUser = await serviceUser.deleteUser('riquelmestayler@gmail.com')

    expect(deletedUser).toBeDefined()
    expect(deletedUser).toHaveProperty('id')

    expect(async () => {
        const event = await serviceUser.getUserByEmail('riquelmestayler@gmail.com')
    }).rejects.toThrow('User not exist')
})
