import { Event, Ticket } from "@prisma/client";
import { User } from "../types/authType";
import { createStripeCustomer } from "./stripe";


export const createAdminUser = async () => {
    const customer = await createStripeCustomer({ email: 'riquelmeadmin@gmail.com', name: 'Riquelme Admin' })

    const adminUser: User = {
        document: '06955734114',
        email: 'riquelmeadmin@gmail.com',
        name: 'Riquelme Admin',
        password: '123456789!',
        role: 'ADMIN',
        stripeCustomerId: customer.id
    }

    return adminUser
}

export const createUsertest = async () => {
    const customer = await createStripeCustomer({ email: 'teste@gmail.com', name: 'Testador' })

    const user: User = {
        email: 'teste@gmail.com',
        name: 'Testador',
        password: 'senha123',
        document: '06955734112',
        stripeCustomerId: customer.id
    }

    return user
}

export const createUserOrganizer = async () => {
    const customer = await createStripeCustomer({ email: 'riquelmesenna577@gmail.com', name: 'Riqulme Senna' })
    const user: User = {
        name: "Riquelme Senna",
        document: '06955734113',
        email: 'riquelmesenna577@gmail.com',
        password: '123456789!',
        role: 'ORGANIZER',
        stripeCustomerId: customer.id
    }

    return user
}

export const createCategory = async () => {
    const category = {
        id: 1,
        name: 'Rap'
    }

    return category
}

export const createEvent = async () => {
    const event: Event = {
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
    }

    return event
}

export const createNewTicket = async () => {
    const newTicket: Ticket = {
        id: 1,
        eventId: (await createEvent()).id,
        price: 50,
        available: 100,
        totalQuantity: 100,
        name: 'Pista 1 Lote',
        stripeProductId: 'prod_J1',
        type: 'PAID'
    }

    return newTicket
}