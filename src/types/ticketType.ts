export type newTicket = {
    type: 'FREE' | 'PAID'
    price: number,
    name: string
    totalQuantity: number,
    available: number,
    eventId: number
}

export type updatedTicket = {
    type?: 'FREE' | 'PAID'
    price?: number,
    name?: string
    totalQuantity?: number,
    available?: number
}