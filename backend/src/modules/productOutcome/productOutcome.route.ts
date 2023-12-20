import express from 'express';
import { ProductOutcomeController } from './productOutcome.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createProductOutcomeValidation } from './productOutcome.validation';
import { checkUserPermission } from '../../middlewares/auth';

const router = express.Router();

router.get('/', checkUserPermission('productOutcome', 'read'), ProductOutcomeController.getFilteredProductOutcomes);
router.post(
  '/',
  checkUserPermission('productOutcome', 'create'),
  validate(createProductOutcomeValidation),
  ProductOutcomeController.createProductOutcome,
);
router.delete(
  '/:id',
  checkUserPermission('productOutcome', 'delete'),
  validateMongoId,
  ProductOutcomeController.removeProductOutcome,
);

export { router as ProductOutcomeRoutes };
