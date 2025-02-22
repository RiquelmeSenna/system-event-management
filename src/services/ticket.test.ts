import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { User } from "../types/authType";
import { Category, Event, Ticket } from "@prisma/client";
import * as utilObject from '../utils/objectsTest'
import { register } from "../models/auth";
import * as serviceTicket from './ticket'
import { prisma } from "../database/prismaConnection";
import { addEvent, deleteEvent, getEvent, updateEvent } from "./events";
import { deleteUser } from "./user";


describe("Should test all services from ticket", () => {
    let user: User
    let category: Category
    let event: Event
    let newTicket: Ticket

    beforeAll(async () => {
        user = await utilObject.createUserOrganizer()
        category = await utilObject.createCategory()
        event = await utilObject.createEvent()

        await register(user)
        await prisma.category.create({ data: category })
        await addEvent(event, user.email)
    })

    test("Should create ticket", async () => {
        newTicket = await serviceTicket.createTicket(await utilObject.createNewTicket(), user.email)

        expect(newTicket.name).toBe('Pista 1 Lote')
        expect(newTicket.eventId).toBe(event.id)
    })

    test("Shouldn't create ticket because user not organizer", async () => {
        expect(async () => {
            await serviceTicket.createTicket(newTicket, 'riquelmetesteerrado@gmail.com')
        }).rejects.toThrow('User not exist')
    })

    test('Should update ticket', async () => {
        const updatedTicket = await serviceTicket.updateTicket({ name: 'Pista 2 lote', price: 75, },
            newTicket.id, user.email);

        expect(updatedTicket.name).toBe('Pista 2 lote')
        expect(updatedTicket.price).toBe(75)
    })

    test("Shouldn't update ticket because not exist", () => {
        expect(async () => {
            await serviceTicket.updateTicket({ name: 'Pista 3 lote' }, 2, user.email)
        }).rejects.toThrow('Ticket not exist')
    })

    test('Should delete ticket', async () => {
        const deletedTicket = await serviceTicket.deleteTicket(newTicket.id, user.email)

        expect(deletedTicket).toBeDefined()
        expect(deletedTicket).toHaveProperty('id')

        expect(async () => {
            await serviceTicket.deleteTicket(newTicket.id, user.email)
        }).rejects.toThrow('Ticket not exist')
    })

    afterAll(async () => {
        await updateEvent({ active: false }, event.id, user.email)
        await deleteEvent(event.id, user.email)
        await prisma.category.delete({ where: { id: category.id } })
        await deleteUser(user.email)
    })
})