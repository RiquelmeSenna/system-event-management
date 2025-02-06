import { prisma } from "../database/prismaConnection"


export const getCategories = async () => {
    const categories = await prisma.category.findMany({
        select: {
            name: true,
            Event: {
                select: {
                    name: true,
                    description: true,
                    location: true,
                    date: true,
                    maxCapacity: true,

                }
            }
        }
    })

    return categories
}

export const getCategory = async (id: number) => {
    const category = await prisma.category.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            Event: {
                select: {
                    name: true,
                    description: true,
                    location: true,
                    date: true,
                    maxCapacity: true,

                }
            }
        }
    })

    return category
}

export const getCategoryByname = async (name: string) => {
    const categories = await prisma.category.findMany({
        where: {
            name: { contains: name, mode: 'insensitive' }
        },
        select: {
            name: true,
            Event: {
                select: {
                    name: true,
                    description: true,
                    location: true,
                    date: true,
                    maxCapacity: true,

                }
            }
        }
    })

    return categories
}

export const addCategory = async (name: string) => {
    const category = await prisma.category.create({
        data: { name }
    })

    return category
}

export const updateCategory = async (id: number, name: string) => {
    const category = await prisma.category.update({ where: { id }, data: { name } })

    return category
}

export const deletecategory = async (id: number) => {
    const category = await prisma.category.delete({ where: { id } })

    return category
}





