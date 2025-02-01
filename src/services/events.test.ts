import { describe, test, beforeAll, afterAll, expect } from '@jest/globals';
import * as serviceEvent from './events'
import { CreateEvent } from '../types/eventType';
import { Event } from '@prisma/client';

describe('Should test all services from events', () => {
    const data: Event = {
        name: 'Rap game 2.0',
        description: 'Rap game 2.0 a nova versão',
        date: new Date('2025-10-01'),
        location: 'New York/NY',
        maxCapacity: 500,
        categoryId: 2,
        active: true,
        id: 1,
        organizerId: 8,
        participants: 0,
        revenue: 0
    };

    test('Should test if create the event', async () => {
        const newEvent = await serviceEvent.addEvent(data, 'riquelmestayler@gmail.com')

        expect(newEvent.active).toBeTruthy();
        expect(newEvent.name).toBe('Rap game 2.0')
    })

    test("Shouldn't create user because user is not Organizer", () => {
        expect(async () => {
            await serviceEvent.addEvent(data, 'riquelmesenna577@gmail.com')
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
        expect(event.organizerId).toBe(8)
    })

    test("Shouldn't find event because wrong id", () => {
        expect(async () => {
            await serviceEvent.getEvent(2)
        }).rejects.toThrow('Event not exist')
    })

    test('Should find event by local', async () => {
        const events = await serviceEvent.getEventLocal('NEW YORK', 1)

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
        const updatedEvent = await serviceEvent.updateEvent({ active: false, name: 'Rap game atualizado' }, 1, 'riquelmestayler@gmail.com')

        expect(updatedEvent.active).toBeFalsy()
        expect(updatedEvent.name).toBe('Rap game atualizado')
    })

    test("Shouldn't update event because user is wrong", () => {
        expect(async () => {
            await serviceEvent.updateEvent({ name: 'Sla' }, 1, 'riquelmesenna577@gmail.com')
        }).rejects.toThrow('Only the organizer can update this event')
    })

    test('Should delete event', async () => {
        const deletedEvent = await serviceEvent.deleteEvent(1, 'riquelmestayler@gmail.com')

        expect(deletedEvent).toBeDefined()
        expect(deletedEvent).toHaveProperty('id')

        expect(async () => {
            const event = await serviceEvent.getEvent(1)
        }).rejects.toThrow('Event not exist')

    })

    test("Shouldn't delete event because user is wrong", () => {
        expect(async () => {
            await serviceEvent.deleteEvent(28, 'riquelmesenna577@gmail.com')
        }).rejects.toThrow('Only the organizer can delete this event')
    })

    test("Shouldn't delete event because it still active", () => {
        expect(async () => {
            await serviceEvent.deleteEvent(29, 'riquelmestayler@gmail.com')
        }).rejects.toThrow('Disable the event before deleting')
    })
})


