import { RequestHandler } from 'express';
import { CategoryModel } from './category.model';
import createHttpError from 'http-errors';
import { CreateAndUpdateCategoryBody, UpdateCategoryParams } from './category.dto';

const getAllCategories: RequestHandler = async (req, res, next) => {
	try {
		const categories = await CategoryModel.find();

		res.status(200).json({ data: categories });
	} catch (error) {
		next(error);
	}
};

const getSingleCategoryById: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;

		const category = await CategoryModel.findById(id);
		if (!category) {
			throw createHttpError(404, 'Ангилал олдсонгүй!');
		}

		res.status(200).json({ data: category });
	} catch (error) {
		next(error);
	}
};

const createCategory: RequestHandler<
	unknown,
	unknown,
	CreateAndUpdateCategoryBody,
	unknown
> = async (req, res, next) => {
	try {
		const { title, description } = req.body;

		const newCategory = await CategoryModel.create({ title, description: description || '' });
		res.status(201).json({ data: newCategory });
	} catch (error) {
		next(error);
	}
};

const updateCategory: RequestHandler<
	UpdateCategoryParams,
	unknown,
	CreateAndUpdateCategoryBody,
	unknown
> = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { title, description } = req.body;

		const categoryExist = await CategoryModel.findById(id);
		if (!categoryExist) {
			throw createHttpError(404, 'Ангилал олдсонгүй!');
		}

		const updatedCategory = await CategoryModel.findByIdAndUpdate(
			id,
			{ title, description: description || '' },
			{ new: true }
		);

		res.status(200).json({ data: updatedCategory });
	} catch (error) {
		next(error);
	}
};

const deleteCategory: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;

		const categoryExist = await CategoryModel.findById(id);
		if (!categoryExist) {
			throw createHttpError(404, 'Ангилал олдсонгүй!');
		}

		await CategoryModel.findByIdAndDelete(id);

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

export const CategoryController = {
	getAllCategories,
	getSingleCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};
