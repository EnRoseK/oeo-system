import { IProduct } from '@/interfaces';

export interface IProductIncome {
  id: number;
  basePrice: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}
