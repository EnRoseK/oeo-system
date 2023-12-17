import express from 'express';
import { ProductOutcomeController } from './productOutcome.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createProductOutcomeValidation } from './productOutcome.validation';

const router = express.Router();

router.get('/', ProductOutcomeController.getFilteredProductOutcomes);
router.post('/', validate(createProductOutcomeValidation), ProductOutcomeController.createProductOutcome);
router.delete('/:id', validateMongoId, ProductOutcomeController.removeProductOutcome);

export { router as ProductOutcomeRoutes };
