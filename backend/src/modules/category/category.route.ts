import express from 'express';
import { CategoryController } from './category.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createAndUpdateCategoryValidation } from './category.validation';
import { checkUserPermission } from '../../middlewares/auth';

const router = express.Router();

router.get('/all', CategoryController.getAllCategories);
router.get('/', checkUserPermission('category', 'read'), CategoryController.getFilteredCategories);
router.get('/:id', checkUserPermission('category', 'read'), validateMongoId, CategoryController.getSingleCategoryById);
router.post(
  '/',
  checkUserPermission('category', 'create'),
  validate(createAndUpdateCategoryValidation),
  CategoryController.createCategory,
);
router.patch(
  '/:id',
  checkUserPermission('category', 'update'),
  validateMongoId,
  validate(createAndUpdateCategoryValidation),
  CategoryController.updateCategory,
);
router.delete('/:id', checkUserPermission('category', 'delete'), validateMongoId, CategoryController.deleteCategory);

export { router as CategoryRoutes };
