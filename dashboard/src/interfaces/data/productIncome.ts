import { IProduct } from '..';

export interface IProductIncome {
  _id: string;
  productIncomeId: string;
  productId: string;
  basePrice: number;
  quantity: number;
  totalPrice: number;
  product: IProduct;
  createdAt: string;
  updatedAt: string;
}
