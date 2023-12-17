import { Document, Schema, Types, model } from 'mongoose';

export interface IFinanceIncome extends Document<Types.ObjectId> {
  type: 'PRODUCT';
  amount: number;
  productOutcomeId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FinanceIncomeSchema = new Schema<IFinanceIncome>(
  {
    type: {
      type: String,
      enum: ['PRODUCT'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    productOutcomeId: String,
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

FinanceIncomeSchema.virtual('productOutcome', {
  ref: 'ProductOutcome',
  localField: 'productOutcomeId',
  foreignField: '_id',
  justOne: true,
});

export const FinanceIncomeModel = model<IFinanceIncome>('FinanceIncome', FinanceIncomeSchema);
