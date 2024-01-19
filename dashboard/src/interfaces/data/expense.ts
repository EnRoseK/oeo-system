export interface IExpense {
  _id: string;
  expenseId: string;
  name: string;
  description?: string;
  type: 'CARD' | 'CASH' | 'TRANSFER' | 'RENT';
  amount: number;
  createdAt: string;
  updatedAt: string;
}
