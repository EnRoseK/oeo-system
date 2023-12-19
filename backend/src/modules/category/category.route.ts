import express from 'express';
import { CategoryController } from './category.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createAndUpdateCategoryValidation } from './category.validation';
import { authorizeAdmin } from '../../middlewares/auth';

const router = express.Router();

router.get('/all', CategoryController.getAllCategories);
router.get('/', CategoryController.getFilteredCategories);
router.get('/:id', validateMongoId, CategoryController.getSingleCategoryById);
router.post('/', authorizeAdmin, validate(createAndUpdateCategoryValidation), CategoryController.createCategory);
router.patch(
  '/:id',
  authorizeAdmin,
  validateMongoId,
  validate(createAndUpdateCategoryValidation),
  CategoryController.updateCategory,
);
router.delete('/:id', authorizeAdmin, validateMongoId, CategoryController.deleteCategory);

export { router as CategoryRoutes };
