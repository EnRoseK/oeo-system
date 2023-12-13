import express from 'express';
import { ProductIncomeController } from './productIncome.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createProductIncomeValidation } from './productIncome.validation';

const router = express.Router();

router.get('/', ProductIncomeController.getFilteredProductIncomes);
router.post('/', validate(createProductIncomeValidation), ProductIncomeController.createProductIncome);
router.delete('/:id', validateMongoId, ProductIncomeController.removeProductIncome);

export { router as ProductIncomeRoutes };
