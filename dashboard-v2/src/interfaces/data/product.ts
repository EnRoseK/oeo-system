import { ICategory } from '@/interfaces';

export interface IProduct {
  id: number;
  title: string;
  description?: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  product_category: ICategory;
}
