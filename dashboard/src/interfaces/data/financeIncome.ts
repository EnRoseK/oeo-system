import { IProductOutcome } from '..';

export interface IFinanceIncome {
  _id: string;
  type: 'PRODUCT';
  amount: number;
  productOutcomeId?: string;
  productOutcome: IProductOutcome;
  createdAt: string;
  updatedAt: string;
}
