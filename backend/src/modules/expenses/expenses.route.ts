import express from 'express';
import { ExpenseController } from './expenses.controller';
import { validate, validateMongoId } from '../../middlewares';
import { checkUserPermission } from '../../middlewares/auth';
import { createExpenseValidation } from './expenses.validation';

const router = express.Router();

router.get('/', checkUserPermission('expenses', 'read'), ExpenseController.getFilteredExpenses);
router.post(
  '/',
  checkUserPermission('expenses', 'create'),
  validate(createExpenseValidation),
  ExpenseController.createExpense,
);
router.delete('/:id', checkUserPermission('expenses', 'delete'), validateMongoId, ExpenseController.removeExpense);

export { router as ExpenseRoutes };
