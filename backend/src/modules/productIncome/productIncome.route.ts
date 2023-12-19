import express from 'express';
import { ProductIncomeController } from './productIncome.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createProductIncomeValidation } from './productIncome.validation';
import { authorizeAdmin } from '../../middlewares/auth';

const router = express.Router();

router.get('/', ProductIncomeController.getFilteredProductIncomes);
router.post('/', authorizeAdmin, validate(createProductIncomeValidation), ProductIncomeController.createProductIncome);
router.delete('/:id', authorizeAdmin, validateMongoId, ProductIncomeController.removeProductIncome);

export { router as ProductIncomeRoutes };
