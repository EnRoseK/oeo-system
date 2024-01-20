import { IProduct } from '@/interfaces';

export interface IProductExpense {
  id: number;
  basePrice: number;
  quantity: number;
  totalPrice: number;
  paymentType: 'CARD' | 'CASH' | 'TRANSFER' | 'RENT';
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}
