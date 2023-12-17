import { IProduct } from '..';

export interface IProductOutcome {
  _id: string;
  productOutcomeId: string;
  productId: string;
  basePrice: number;
  quantity: number;
  totalPrice: number;
  product: IProduct;
  createdAt: string;
  updatedAt: string;
}
