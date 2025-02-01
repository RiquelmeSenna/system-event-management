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

    test('Should found events', async () => {
        const events = await serviceEvent.getEvents(1)

        expect(events.length).toBeGreaterThanOrEqual(1);
    })

    test('Should found one event', async () => {
        const event = await serviceEvent.getEvent(1)

        expect(event.active).toBeTruthy()
        expect(event).toHaveProperty('name')
        expect(event.organizerId).toBe(8)
    })

    test('Should found event by local', async () => {
        const events = await serviceEvent.getEventLocal('NEW YORK', 1)

        expect(events.length).toBeGreaterThanOrEqual(1)
    })

    test('Should found event by name', async () => {
        const events = await serviceEvent.getEventByName('Rap', 0);

        expect(events.length).toBeGreaterThanOrEqual(1)
    })

    test('Should update event property name and active', async () => {
        const updatedEvent = await serviceEvent.updateEvent({ active: false, name: 'Rap game atualizado' }, 1, 'riquelmestayler@gmail.com')

        expect(updatedEvent.active).toBeFalsy()
        expect(updatedEvent.name).toBe('Rap game atualizado')
    })

    test('Should delete event', async () => {
        const deletedEvent = await serviceEvent.deleteEvent(1, 'riquelmestayler@gmail.com')

        expect(deletedEvent).toBeDefined()
        expect(deletedEvent).toHaveProperty('id')

        expect(async () => {
            const event = await serviceEvent.getEvent(1)
        }).rejects.toThrow('Event not exist')

    })
})


