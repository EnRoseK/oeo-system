import { IProduct } from '@/interfaces';

export interface IProductReport {
  id: number;
  createdAt: string;
  updatedAt: string;
  before: number;
  after: number;
  incomeAmount: number;
  expenseAmount: number;
  product: IProduct;
}
