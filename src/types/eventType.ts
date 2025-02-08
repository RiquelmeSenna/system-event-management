export type UpdateEvent = {
    name?: string,
    description?: string,
    location?: string,
    date?: Date,
    maxCapacity?: number,
    active?: boolean,
    categoryId?: number
    Image?: string
}

export type CreateEvent = {
    name: string,
    description: string,
    location: string,
    date: Date,
    maxCapacity: number,
    categoryId: number,
    Image: string
}