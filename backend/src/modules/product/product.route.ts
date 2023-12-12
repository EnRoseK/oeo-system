import express from 'express';
import { ProductController } from './product.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createAndUpdateProductValidation } from './product.validation';

const router = express.Router();

router.get('/', ProductController.getFilteredProducts);
router.post('/', validate(createAndUpdateProductValidation), ProductController.createProduct);
router.patch('/:id', validateMongoId, validate(createAndUpdateProductValidation), ProductController.updateProduct);
router.delete('/:id', validateMongoId, ProductController.deleteProduct);

export { router as ProductRoutes };
