import { Router } from 'express';
import { FinanceExpenseContoller } from './financeExpense.controller';
import { authorizeAccountant } from '../../middlewares/auth';

const router = Router();

router.get('/', authorizeAccountant, FinanceExpenseContoller.getFilteredFinanceExpenses);
router.post('/', authorizeAccountant, FinanceExpenseContoller.createFinanceExpenses);
router.delete('/:id', authorizeAccountant, FinanceExpenseContoller.removeFinanceExpense);

export { router as FinanceExpenseRoutes };
