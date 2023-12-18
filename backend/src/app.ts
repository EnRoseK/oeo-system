import express from 'express';
import cors from 'cors';
import { errorHandler, wrongEndpointHandler } from './middlewares';
import { CategoryRoutes } from './modules/category/category.route';
import { ProductRoutes } from './modules/product/product.route';
import { ProductIncomeRoutes } from './modules/productIncome/productIncome.route';
import { ProductOutcomeRoutes } from './modules/productOutcome/productOutcome.route';
import { FinanceIncomeRoutes } from './modules/financeIncome/financeIncome.route';
import { FinanceExpenseRoutes } from './modules/financeExpense/financeExpense.route';
import { UserRoutes } from './modules/user/user.route';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/categories', CategoryRoutes);
app.use('/products/incomes', ProductIncomeRoutes);
app.use('/products/outcomes', ProductOutcomeRoutes);
app.use('/products', ProductRoutes);
app.use('/finance/incomes', FinanceIncomeRoutes);
app.use('/finance/expenses', FinanceExpenseRoutes);
app.use('/users', UserRoutes);

app.use(wrongEndpointHandler);

app.use(errorHandler);

export default app;
