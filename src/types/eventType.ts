export type UpdateEvent = {
    name?: string,
    description?: string,
    location?: string,
    date?: Date,
    time: Date,
    maxCapacity?: number,
    active?: boolean
}

export type CreateEvent = {
    name: string,
    description: string,
    location: string,
    date: Date,
    maxCapacity: number,
    categoryId: number,
}