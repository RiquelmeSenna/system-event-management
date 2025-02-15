export type newTicket = {
    type: 'FREE' | 'PAID'
    price: number,
    name: string
    totalQuantity: number,
    available: number,
    eventId: number,
    stripeProductId: string
}

export type updatedTicket = {
    type?: 'FREE' | 'PAID'
    price?: number,
    name?: string
    totalQuantity?: number,
    available?: number
}