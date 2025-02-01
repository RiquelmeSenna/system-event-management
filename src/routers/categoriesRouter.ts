import { Router } from 'express'
import * as categoryController from '../controllers/categoriesController'

export const CategoryRouter = Router()

CategoryRouter.get('/', categoryController.getCategories)
CategoryRouter.get('/:id', categoryController.getCategory)
CategoryRouter.post('/', categoryController.createCategory)
CategoryRouter.put('/:id', categoryController.updateCategory)
CategoryRouter.delete('/:id', categoryController.deleteCategory)


