import { Document, Schema, Types, model } from 'mongoose';

export interface IProduct extends Document<Types.ObjectId> {
  title: string;
  description?: string;
  categoryId: string;
  remainder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    categoryId: {
      type: String,
      required: true,
    },
    remainder: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

ProductSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

export const ProductModel = model<IProduct>('Product', ProductSchema);
