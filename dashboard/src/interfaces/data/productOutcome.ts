import { IProduct } from '..';

export interface IProductOutcome {
  _id: string;
  productOutcomeId: string;
  productId: string;
  basePrice: number;
  quantity: number;
  totalPrice: number;
  product: IProduct;
  payment: 'CARD' | 'CASH' | 'TRANSFER' | 'RENT';
  createdAt: string;
  updatedAt: string;
}
