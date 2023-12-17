export interface IFinanceIncome {
  _id: string;
  type: 'PRODUCT';
  amount: number;
  productOutcomeId?: string;
  createdAt: string;
  updatedAt: string;
}
