export interface createFinanceExpenseBody {
  type: 'PRODUCT' | 'SALARY' | 'RENT' | 'TAX' | 'OTHER';
  amount: number;
  description?: string;
}
