import express from 'express';
import { ProductController } from './product.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createAndUpdateProductValidation } from './product.validation';
import { authorizeAdmin } from '../../middlewares/auth';

const router = express.Router();

router.get('/all', ProductController.getAllProducts);
router.get('/', ProductController.getFilteredProducts);
router.post('/', authorizeAdmin, validate(createAndUpdateProductValidation), ProductController.createProduct);
router.patch(
  '/:id',
  authorizeAdmin,
  validateMongoId,
  validate(createAndUpdateProductValidation),
  ProductController.updateProduct,
);
router.delete('/:id', authorizeAdmin, validateMongoId, ProductController.deleteProduct);

export { router as ProductRoutes };
