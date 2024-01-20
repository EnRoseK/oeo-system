export interface IExpense {
  id: number;
  name: string;
  description?: string;
  type: 'CARD' | 'CASH' | 'TRANSFER' | 'RENT';
  amount: number;
  createdAt: string;
  updatedAt: string;
}
