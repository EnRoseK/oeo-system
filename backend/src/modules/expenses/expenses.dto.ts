export interface createExpenseBody {
  name: string;
  description?: string;
  type: 'CARD' | 'CASH' | 'TRANSFER' | 'RENT';
  amount: number;
}
