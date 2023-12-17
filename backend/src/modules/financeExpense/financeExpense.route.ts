import { Router } from 'express';
import { FinanceExpenseContoller } from './financeExpense.controller';

const router = Router();

router.get('/', FinanceExpenseContoller.getFilteredFinanceExpenses);
router.post('/', FinanceExpenseContoller.createFinanceExpenses);
router.delete('/:id', FinanceExpenseContoller.removeFinanceExpense);

export { router as FinanceExpenseRoutes };
