import { Document, Schema, Types, model } from 'mongoose';

export interface ICategory extends Document<Types.ObjectId> {
	title: string;
	description?: string;
	productCount: number;
	createdAt: Date;
	updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
	{
		title: {
			type: String,
			required: true,
		},
		description: String,
		productCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

export const CategoryModel = model<ICategory>('Category', CategorySchema);
