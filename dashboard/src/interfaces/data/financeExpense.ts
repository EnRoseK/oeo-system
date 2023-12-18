import { IProductIncome } from '..';

export interface IFinanceExpense {
  _id: string;
  type: 'PRODUCT' | 'SALARY' | 'RENT' | 'TAX' | 'OTHER';
  amount: number;
  description?: string;
  productIncomeId?: string;
  productIncome?: IProductIncome;
  createdAt: string;
  updatedAt: string;
}
