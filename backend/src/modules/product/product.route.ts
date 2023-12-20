import express from 'express';
import { ProductController } from './product.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createAndUpdateProductValidation } from './product.validation';
import { checkUserPermission } from '../../middlewares/auth';

const router = express.Router();

router.get('/all', ProductController.getAllProducts);
router.get('/', checkUserPermission('product', 'read'), ProductController.getFilteredProducts);
router.post(
  '/',
  checkUserPermission('product', 'create'),
  validate(createAndUpdateProductValidation),
  ProductController.createProduct,
);
router.patch(
  '/:id',
  checkUserPermission('product', 'update'),
  validateMongoId,
  validate(createAndUpdateProductValidation),
  ProductController.updateProduct,
);
router.delete('/:id', checkUserPermission('product', 'delete'), validateMongoId, ProductController.deleteProduct);

export { router as ProductRoutes };
