import express from 'express';
import { FinanceIncomeController } from './financeIncome.contoller';
import { checkUserPermission } from '../../middlewares/auth';

const router = express.Router();

router.get('/', checkUserPermission('financeIncome', 'read'), FinanceIncomeController.getFilteredFinanceIncomes);

export { router as FinanceIncomeRoutes };
