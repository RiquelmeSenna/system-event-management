import { Router } from 'express'
import * as categoryController from '../controllers/categoriesController'
import { authMiddleware } from '../middlewares/authJwt'

export const CategoryRouter = Router()

CategoryRouter.get('/', categoryController.getCategories)
CategoryRouter.get('/:id', categoryController.getCategory)
CategoryRouter.get('/search/:name', categoryController.getCategoryByname)
CategoryRouter.post('/', authMiddleware, categoryController.createCategory)
CategoryRouter.put('/:id', authMiddleware, categoryController.updateCategory)
CategoryRouter.delete('/:id', authMiddleware, categoryController.deleteCategory)


