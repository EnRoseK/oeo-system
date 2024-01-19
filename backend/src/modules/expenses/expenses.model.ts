import { Document, Schema, Types, model } from 'mongoose';

export interface IExpense extends Document<Types.ObjectId> {
  expenseId: string;
  name: string;
  description?: string;
  type: 'CARD' | 'CASH' | 'TRANSFER' | 'RENT';
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    expenseId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    type: {
      type: String,
      enum: ['CARD', 'CASH', 'TRANSFER', 'RENT'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const ExpenseModel = model<IExpense>('Expense', ExpenseSchema);
