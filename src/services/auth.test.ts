import { expect, test, describe, beforeAll, afterAll } from '@jest/globals'
import { login, register } from './auth'
import { User } from '../types/authType'
import { prisma } from '../database/prismaConnection'
import { createStripeCustomer } from '../utils/stripe'



describe('Should test auth in service', () => {

    let user: User

    test('should register user in database', async () => {
        const customer = await createStripeCustomer({ email: 'teste@gmail.com', name: 'Testador' })
        user = {
            email: 'teste@gmail.com',
            name: 'Testador',
            password: 'senha123',
            document: '06955734112',
            stripeCustomerId: customer.id
        }
        const newUser = await register(user)

        expect(newUser.name).toBe('Testador')
        expect(newUser).toBeTruthy()
    });

    test('should login user', async () => {
        const User = await login(user.email, user.password)

        expect(User.name).toBe('Testador')
        expect(user).toHaveProperty('stripeCustomerId')
        expect(User).toBeTruthy()
    });

    test("should not register user", () => {
        expect(async () => {
            const newUser = await register(user)
        }).rejects.toThrow('User existing')
    });

    test('should not login user if email is wrong', () => {
        expect(async () => {
            const User = await login('testadorfalse@gmail.com', user.password)
        }).rejects.toThrow('The user does not exist')
    });

    test('should not login user if password is wrong', () => {
        expect(async () => {
            const User = await login(user.email, 'baboseira123')
        }).rejects.toThrow('Password is wrong')
    });

    afterAll(async () => {
        return await prisma.user.delete({
            where: {
                email: user.email
            }
        })
    })

})



