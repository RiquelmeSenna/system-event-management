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

//Event

/*describe.skip('Should test all services from events', () => {
    const user: User = {
        name: "Riquelme Senna",
        document: '06955734113',
        email: 'riquelmesenna577@gmail.com',
        password: '123456789!',
        role: 'ORGANIZER'
    }

    const category: Category = {
        id: 1,
        name: 'Rap'
    }

    const data: Event = {
        name: 'Rap game 2.0',
        description: 'Rap game 2.0 a nova versão',
        date: new Date('2025-10-01'),
        location: 'New York/NY',
        maxCapacity: 500,
        categoryId: 1,
        active: true,
        id: 1,
        organizerId: 1,
        participants: 0,
        revenue: 0,
        Image: 'Imagem ficticia'
    };
    let adminUser: User = {
        document: '06955734112', email: 'riquelmeadmin@gmail.com',
        name: "Riquelme Admin", password: '123456789!', role: 'ADMIN'
    }
    beforeAll(async () => {
        await register(user)
        await register(adminUser)
        await prisma.category.create({ data: { id: category.id, name: category.name } })
    })

    test('Should test if create the event', async () => {
        const newEvent = await serviceEvent.addEvent(data, user.email)

        expect(newEvent.active).toBeTruthy();
        expect(newEvent.name).toBe('Rap game 2.0')
    })

    test("Shouldn't create user because user is not Organizer", () => {
        expect(async () => {
            await serviceEvent.addEvent(data, 'emailerrado@gmail.com')
        }).rejects.toThrow('Not possible create the event')
    })

    test('Should find events', async () => {
        const events = await serviceEvent.getEvents(1)

        expect(events.length).toBeGreaterThanOrEqual(1);
    })

    test("Shouldn't find events becacuse skip is greater than must", () => {
        expect(async () => {
            await serviceEvent.getEvents(2)
        }).rejects.toThrow("Don't has more Events")

    })

    test('Should find one event', async () => {
        const event = await serviceEvent.getEvent(1)

        expect(event.active).toBeTruthy()
        expect(event).toHaveProperty('name')
    })

    test("Shouldn't find event because wrong id", () => {
        expect(async () => {
            await serviceEvent.getEvent(2)
        }).rejects.toThrow('Event not exist')
    })

    test('Should find event by local', async () => {
        const events = await serviceEvent.getEventLocal('new york', 1)

        expect(events.length).toBeGreaterThanOrEqual(1)
    })

    test("Shouldn't find event because not exist local", () => {
        expect(async () => {
            await serviceEvent.getEventLocal('Amapa', 1)
        }).rejects.toThrow('There is no event at this location')
    })

    test('Should find event by name', async () => {
        const events = await serviceEvent.getEventByName('Rap', 0);

        expect(events.length).toBeGreaterThanOrEqual(1)
    })

    test("Shouldn't find event because not exist event with this name", () => {
        expect(async () => {
            await serviceEvent.getEventByName('sertanejo', 1)
        }).rejects.toThrow('There is no event with this name')
    })

    test('Should update event property name and active', async () => {
        const updatedEvent = await serviceEvent.updateEvent({ active: false, name: 'Rap game atualizado' }, 1, user.email)

        expect(updatedEvent.active).toBeFalsy()
        expect(updatedEvent.name).toBe('Rap game atualizado')
    })

    test("Shouldn't update event because user is wrong", () => {
        expect(async () => {
            await serviceEvent.updateEvent({ name: 'Sla' }, 1, 'emailerrado@gmail.com')
        }).rejects.toThrow('Only the organizer can update this event')
    })

    test("Shouldn't delete event because user is wrong", () => {
        expect(async () => {
            await serviceEvent.deleteEvent(data.id, 'emailerrado@gmail.com')
        }).rejects.toThrow('Only the organizer can delete this event')
    })

    test('Should delete event', async () => {
        const deletedEvent = await serviceEvent.deleteEvent(1, user.email)

        expect(deletedEvent).toBeDefined()
        expect(deletedEvent).toHaveProperty('id')

        expect(async () => {
            const event = await serviceEvent.getEvent(1)
        }).rejects.toThrow('Event not exist')

    })


    afterAll(async () => {
        await deleteUser(user.email)
        await deletecategory(adminUser.email, category.id)
        await deleteUser(adminUser.email)
    })
})*/


//User

/*describe.skip('Should test all user services', () => {

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

    test('Should delete User', async () => {
        const deletedUser = await serviceUser.deleteUser('riquelmestayler@gmail.com')

        expect(deletedUser).toBeDefined()
        expect(deletedUser).toHaveProperty('id')

        expect(async () => {
            const event = await serviceUser.getUserByEmail('riquelmestayler@gmail.com')
        }).rejects.toThrow('User not exist')
    })
})*/

