import { Document, Schema, Types, model } from 'mongoose';

export interface IProductOutcome extends Document<Types.ObjectId> {
  productOutcomeId: string;
  productId: string;
  quantity: number;
  basePrice: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductOutcomeSchema = new Schema<IProductOutcome>(
  {
    productOutcomeId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    basePrice: {
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

ProductOutcomeSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true,
});

export const ProductOutcomeModel = model<IProductOutcome>('ProductOutcome', ProductOutcomeSchema);
