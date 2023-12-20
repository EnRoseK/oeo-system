import express from 'express';
import { ProductIncomeController } from './productIncome.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createProductIncomeValidation } from './productIncome.validation';
import { checkUserPermission } from '../../middlewares/auth';

const router = express.Router();

router.get('/', checkUserPermission('productIncome', 'read'), ProductIncomeController.getFilteredProductIncomes);
router.post(
  '/',
  checkUserPermission('productIncome', 'create'),
  validate(createProductIncomeValidation),
  ProductIncomeController.createProductIncome,
);
router.delete(
  '/:id',
  checkUserPermission('productIncome', 'delete'),
  validateMongoId,
  ProductIncomeController.removeProductIncome,
);

export { router as ProductIncomeRoutes };
