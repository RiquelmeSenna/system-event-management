import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { Category, Event, Ticket, } from "@prisma/client";
import * as utilObject from '../utils/objectsTest'
import { register } from "./auth";
import * as serviceCart from './cart'
import { User } from "../types/authType";
import { prisma } from "../database/prismaConnection";
import { addEvent, deleteEvent, getEvent, updateEvent } from "./events";
import { createTicket, deleteTicket } from "./ticket";
import { deleteUser } from "./user";


describe('Should test all services from cart', () => {
    let userOrganizer: User
    let user: User
    let category: Category
    let event: Event
    let ticket: Ticket

    beforeAll(async () => {
        userOrganizer = await utilObject.createUserOrganizer()
        user = await utilObject.createUsertest()
        category = await utilObject.createCategory()
        event = await utilObject.createEvent()
        ticket = await utilObject.createNewTicket()

        await register(userOrganizer)
        await register(user)
        await prisma.category.create({ data: category })
        await addEvent(event, userOrganizer.email)
        await createTicket(ticket, userOrganizer.email)
    })

    test('Should add ticket in user', async () => {
        const newTickeUser = await serviceCart.addCartTicket(ticket.id, user.email)

        expect(newTickeUser.ticketId).toBe(ticket.id)
    })

    test('Should test if checkout go be right', async () => {
        const checkout = await serviceCart.checkoutCart(user.email)

        expect(checkout).toBeUndefined()
    })


    afterAll(async () => {
        await deleteTicket(ticket.id, userOrganizer.email)
        await updateEvent({ active: false }, event.id, userOrganizer.email)
        await deleteEvent(event.id, userOrganizer.email)
        await prisma.category.delete({ where: { id: category.id } })
        await deleteUser(user.email)
        await deleteUser(userOrganizer.email)
    })

})