import { RequestHandler, Response } from 'express';
import * as serviceCategories from '../services/categories'
import * as schemaCategoires from '../validations/categories'
import { ExtendRequest } from '../types/extented-request';

export const getCategories: RequestHandler = async (req, res) => {
    try {
        const categories = await serviceCategories.getCategories()

        res.json({ categories })
    } catch (error) {
        res.status(400).json({ error: 'Não foi possivel encontrar as categorias' })
    }
};

export const getCategory: RequestHandler = async (req, res) => {
    const safeData = schemaCategoires.getcategorySchema.safeParse(req.params)

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const category = await serviceCategories.getCategory(parseInt(safeData.data.id))

        res.json({ category })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Nao foi possivel encontrar a categoria' })
    }
}

export const getCategoryByname: RequestHandler = async (req, res) => {
    const safeData = schemaCategoires.schemaNameCategory.safeParse(req.params)

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const categories = await serviceCategories.getCategoryByname(safeData.data.name)

        res.json({ categories })
    } catch (error) {
        res.status(400).json({ error: 'Não foi possivel encontrar categorias com esse nome' })
    }
}

export const createCategory = async (req: ExtendRequest, res: Response) => {
    const safeData = schemaCategoires.schemaNameCategory.safeParse(req.body)
    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const newCategory = await serviceCategories.newcategory(req.userEmail, safeData.data.name)

        res.status(201).json({ newCategory })
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Aconteceu algum error' })
    }
};

export const updateCategory = async (req: ExtendRequest, res: Response) => {
    const safeData = schemaCategoires.getcategorySchema.safeParse(req.params)
    const safeDataBody = schemaCategoires.schemaNameCategory.safeParse(req.body)

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }
    if (!safeDataBody.success) {
        return res.status(400).json({ error: safeDataBody.error.flatten().fieldErrors })
    }

    try {
        const updatedCategory = await serviceCategories.updateCategory(req.userEmail, parseInt(safeData.data.id), safeDataBody.data.name)

        res.status(206).json({ updatedCategory })
    } catch (error) {
        res.status(401).json({ error: 'Não foi possivel atualizar a categoria.' })
    }

};

export const deleteCategory = async (req: ExtendRequest, res: Response) => {
    const safeData = schemaCategoires.getcategorySchema.safeParse(req.params)

    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    }

    try {
        const deletedCategory = await serviceCategories.deletecategory(req.userEmail, parseInt(safeData.data.id))

        res.json({ Deleted: true })
    } catch (error) {
        res.status(401).json({ error: 'Não foi possivel deletar essa categoria' })
    }
};