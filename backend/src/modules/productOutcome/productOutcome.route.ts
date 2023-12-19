import express from 'express';
import { ProductOutcomeController } from './productOutcome.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createProductOutcomeValidation } from './productOutcome.validation';
import { authorizeAdmin } from '../../middlewares/auth';

const router = express.Router();

router.get('/', ProductOutcomeController.getFilteredProductOutcomes);
router.post(
  '/',
  authorizeAdmin,
  validate(createProductOutcomeValidation),
  ProductOutcomeController.createProductOutcome,
);
router.delete('/:id', authorizeAdmin, validateMongoId, ProductOutcomeController.removeProductOutcome);

export { router as ProductOutcomeRoutes };
