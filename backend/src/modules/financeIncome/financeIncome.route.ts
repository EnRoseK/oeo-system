import express from 'express';
import { FinanceIncomeController } from './financeIncome.contoller';
import { authorizeAccountant } from '../../middlewares/auth';

const router = express.Router();

router.get('/', authorizeAccountant, FinanceIncomeController.getFilteredFinanceIncomes);

export { router as FinanceIncomeRoutes };
