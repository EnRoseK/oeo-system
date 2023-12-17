import { Document, Schema, Types, model } from 'mongoose';

export interface IFinanceExpense extends Document<Types.ObjectId> {
  type: 'PRODUCT' | 'SALARY' | 'RENT' | 'TAX' | 'OTHER';
  amount: number;
  description?: string;
  productIncomeId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FinanceExpenseSchema = new Schema<IFinanceExpense>(
  {
    type: {
      type: String,
      enum: ['PRODUCT', 'SALARY', 'RENT', 'TAX', 'OTHER'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: String,
    productIncomeId: String,
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

FinanceExpenseSchema.virtual('productIncome', {
  ref: 'ProductIncome',
  localField: 'productIncomeId',
  foreignField: '_id',
  justOne: true,
});

export const FinanceExpenseModel = model<IFinanceExpense>('FinanceExpense', FinanceExpenseSchema);
