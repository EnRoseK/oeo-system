import express from 'express';
import cors from 'cors';
import { errorHandler, wrongEndpointHandler } from './middlewares';
import { CategoryRoutes } from './modules/category/category.route';
import { ProductRoutes } from './modules/product/product.route';
import { ProductIncomeRoutes } from './modules/productIncome/productIncome.route';
import { ProductOutcomeRoutes } from './modules/productOutcome/productOutcome.route';
import { FinanceIncomeRoutes } from './modules/financeIncome/financeIncome.route';
import { FinanceExpenseRoutes } from './modules/financeExpense/financeExpense.route';
import { AuthRoutes } from './modules/auth/auth.route';
import { UserRoutes } from './modules/user/user.route';
import { HomeRoutes } from './modules/home/home.route';
import session from 'express-session';
import { sessionConfig } from './libs';
import { envalid } from './libs';
import { authorizeUser } from './middlewares/auth';

const app = express();

app.use(
  cors({
    origin: envalid.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(session(sessionConfig));

// Routes
app.use('/auth', AuthRoutes);
app.use(authorizeUser);
app.use('/home', HomeRoutes);
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
