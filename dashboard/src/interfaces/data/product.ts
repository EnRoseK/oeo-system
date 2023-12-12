import { ICategory } from '..';

export interface IProduct {
  _id: string;
  title: string;
  description?: string;
  categoryId: string;
  remainder: number;
  category: ICategory;
  createdAt: string;
  updatedAt: string;
}
