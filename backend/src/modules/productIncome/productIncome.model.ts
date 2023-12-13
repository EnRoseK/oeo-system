import { Document, Schema, Types, model } from 'mongoose';

export interface IProductIncome extends Document<Types.ObjectId> {
  productId: string;
  basePrice: number;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductIncomeSchema = new Schema<IProductIncome>(
  {
    productId: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

ProductIncomeSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true,
});

export const ProductIncomeModel = model<IProductIncome>('ProcutIncome', ProductIncomeSchema);
