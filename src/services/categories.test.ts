import { afterAll, beforeAll, describe, expect, test } from "@jest/globals"
import * as serviceCategories from "./categories"
import { deleteUser } from "./user"
import * as utilsObject from '../utils/objectsTest'
import { register } from "./auth"
import { User } from "../types/authType"

describe('Should test all services from categories', () => {
    let categoryId: number

    let adminUser: User

    beforeAll(async () => {
        adminUser = await utilsObject.createAdminUser()

        await register(adminUser)
    })

    test('Should create a new category', async () => {
        const category = await serviceCategories.newcategory(adminUser.email, 'Rap')

        expect(category.name).toBe('Rap')
        categoryId = category.id
    })

    test('Should find categories', async () => {
        const categories = await serviceCategories.getCategories()

        expect(categories.length).toBeGreaterThanOrEqual(1)
    })

    test('Should find category by id', async () => {
        const category = await serviceCategories.getCategory(categoryId)

        expect(category.name).toBe('Rap')
    })

    test('should find categories by name', async () => {
        const categories = await serviceCategories.getCategoryByname('RAP')

        expect(categories.length).toBeGreaterThanOrEqual(1)
    })

    test('should update category by id', async () => {
        const updatedCategory = await serviceCategories.updateCategory(adminUser.email, categoryId, 'New Rap')

        expect(updatedCategory.name).toBe('New Rap')
    })

    test('Should delete category by id', async () => {
        const deletedCategory = await serviceCategories.deletecategory(adminUser.email, categoryId)

        expect(deletedCategory).toBeDefined()
        expect(deletedCategory).toHaveProperty('id')
    })

    test("Shouldn't get category", () => {
        expect(async () => {
            await serviceCategories.getCategory(8)
        }).rejects.toThrow("This category don't exist")
    })

    test("Shouldn't get category by name ", () => {
        expect(async () => {
            await serviceCategories.getCategoryByname('nome novo')
        }).rejects.toThrow('There is not category with this name')
    })

    test("Shouldn't create new category because user is not admin", () => {
        expect(async () => {
            await serviceCategories.newcategory('riquelmesenna577@gmail.com', 'Rap')
        }).rejects.toThrow('User cannot create Category')
    })

    test("Shouldn't update category because user is not admin", () => {
        expect(async () => {
            await serviceCategories.updateCategory('riquelmesenna577@gmail.com', 3, 'Teatro')
        }).rejects.toThrow('User cannot update Category')
    })

    test("Shouldn't update category because it not exist", () => {
        expect(async () => {
            await serviceCategories.updateCategory(adminUser.email, 1000, 'Rap')
        }).rejects.toThrow('Not found category')
    })

    test("Shouldn't delete category because user is not admin", () => {
        expect(async () => {
            await serviceCategories.deletecategory('riquelmesenna577@gmail.com', categoryId)
        }).rejects.toThrow('User cannot delete Category')
    })

    test("Shouldn't delete category because it not exist", () => {
        expect(async () => {
            await serviceCategories.deletecategory('riquelmeadmin@gmail.com', 1000)
        }).rejects.toThrow('Not found category')
    })

    afterAll(async () => {
        await deleteUser(adminUser.email)
    })

})