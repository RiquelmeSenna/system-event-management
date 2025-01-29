export type UpdateEvent = {
    name?: string,
    description?: string,
    location?: string,
    date?: Date,
    time: Date,
    maxCapacity?: number,
    active?: boolean
}