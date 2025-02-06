import * as categoriesModel from '../models/categories'
import { getUserByEmail } from '../models/user'

export const getCategories = async () => {
    const categories = await categoriesModel.getCategories()

    if (!categories) {
        throw ('There is not categories')
    }

    return categories
}

export const getCategory = async (id: number) => {
    const category = await categoriesModel.getCategory(id)

    if (!category) {
        throw ("This category don't exist")
    }

    return category
}

export const getCategoryByname = async (name: string) => {
    const categories = await categoriesModel.getCategoryByname(name)

    if (categories.length < 1) {
        throw new Error('There is not category with this name')
    }


    return categories
}

export const newcategory = async (email: string, name: string,) => {
    const user = await getUserByEmail(email)

    if (user?.role != 'ADMIN') {
        throw new Error('User cannot create Category')
    }
    const newcategory = await categoriesModel.addCategory(name)

    if (!newcategory) {
        throw new Error('Not possible create category')
    }

    return newcategory
}

export const updateCategory = async (email: string, id: number, name: string) => {
    const user = await getUserByEmail(email)

    if (user?.role != 'ADMIN') {
        throw new Error('User cannot create Category')
    }
    const updatedCategory = await categoriesModel.updateCategory(id, name)

    if (!updatedCategory) {
        throw new Error('Not found category')
    }

    return updatedCategory

}

export const deletecategory = async (email: string, id: number) => {
    const user = await getUserByEmail(email)

    if (user?.role != 'ADMIN') {
        throw new Error('User cannot create Category')
    }
    const deletedCategory = await categoriesModel.deletecategory(id)

    if (!deletedCategory) {
        throw new Error('Not found category')
    }

    return deletedCategory
}