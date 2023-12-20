import { Router } from 'express';
import { FinanceExpenseContoller } from './financeExpense.controller';
import { checkUserPermission } from '../../middlewares/auth';

const router = Router();

router.get('/', checkUserPermission('financeExpense', 'read'), FinanceExpenseContoller.getFilteredFinanceExpenses);
router.post('/', checkUserPermission('financeExpense', 'create'), FinanceExpenseContoller.createFinanceExpenses);
router.delete('/:id', checkUserPermission('financeExpense', 'delete'), FinanceExpenseContoller.removeFinanceExpense);

export { router as FinanceExpenseRoutes };
