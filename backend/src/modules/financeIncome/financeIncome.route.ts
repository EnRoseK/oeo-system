import express from 'express';
import { FinanceIncomeController } from './financeIncome.contoller';

const router = express.Router();

router.get('/', FinanceIncomeController.getFilteredFinanceIncomes);

export { router as FinanceIncomeRoutes };
