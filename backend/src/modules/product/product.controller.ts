import { RequestHandler } from 'express';
import { IProduct, ProductModel } from './product.model';
import { PAGE_SIZE } from '../../constants';
import { createAndUpdateProductBody, updateProductParams } from './product.dto';
import { CategoryModel } from '../category/category.model';
import createHttpError from 'http-errors';
import mongoose, { FilterQuery } from 'mongoose';

const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });

    res.status(200).json({ data: products });
  } catch (error) {
    next(error);
  }
};

const getFilteredProducts: RequestHandler = async (req, res, next) => {
  try {
    const { page = '1', q = '', category = '' } = req.query;
    const currentPage = Number(page);
    const categoryFilter = category ? (category as string).split(',') : [];

    const filter: FilterQuery<IProduct> = { title: new RegExp('^' + q, 'i') };
    if (categoryFilter.length > 0) {
      filter.categoryId = { $in: categoryFilter };
    }

    const products = await ProductModel.find(filter)
      .limit(PAGE_SIZE)
      .skip((currentPage - 1) * PAGE_SIZE)
      .sort({ createdAt: -1 })
      .populate({ path: 'category' });

    const productsCount = await ProductModel.find(filter).countDocuments();

    res.status(200).json({
      data: products,
      pagination: { total: productsCount, currentPage, totalPage: Math.ceil(productsCount / PAGE_SIZE) },
    });
  } catch (error) {
    next(error);
  }
};

const createProduct: RequestHandler<unknown, unknown, createAndUpdateProductBody, unknown> = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { title, description, categoryId, remainder } = req.body;

    const categoryExist = await CategoryModel.findById(categoryId);
    if (!categoryExist) {
      throw createHttpError(404, 'Сонгосон ангилал олдсонгүй!');
    }

    session.startTransaction();

    const [newProduct] = await ProductModel.create([{ title, description: description || '', categoryId, remainder }], {
      session,
      populate: [{ path: 'category' }],
    });

    await CategoryModel.findByIdAndUpdate(categoryId, { $inc: { productCount: 1 } }, { session });

    await session.commitTransaction();

    res.status(201).json({ data: newProduct });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    next(error);
  }
};

const updateProduct: RequestHandler<updateProductParams, unknown, createAndUpdateProductBody, unknown> = async (
  req,
  res,
  next,
) => {
  const session = await mongoose.startSession();

  try {
    const { id } = req.params;
    const { title, description, categoryId } = req.body;

    const productExist = await ProductModel.findById(id);
    if (!productExist) {
      throw createHttpError(404, 'Урвалж олдсонгүй');
    }

    const categoryExist = await CategoryModel.exists({ _id: categoryId });
    if (!categoryExist) {
      throw createHttpError(404, 'Сонгосон ангилал олдсонгүй');
    }

    session.startTransaction();

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { title, description: description || '', categoryId },
      { session, populate: [{ path: 'category' }], new: true },
    );

    if (productExist.categoryId !== categoryId) {
      const oldCategoryId = productExist.categoryId;

      await CategoryModel.findByIdAndUpdate(categoryId, { $inc: { productCount: 1 } }, { session });
      await CategoryModel.findByIdAndUpdate(oldCategoryId, { $inc: { productCount: -1 } }, { session });
    }

    await session.commitTransaction();

    res.status(200).json({
      data: updatedProduct,
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    next(error);
  }
};

const deleteProduct: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { id } = req.params;

    const productExist = await ProductModel.findById(id);
    if (!productExist) {
      throw createHttpError(404, 'Урвалж олдсонгүй');
    }

    session.startTransaction();

    await ProductModel.findByIdAndDelete(id, { session });

    await CategoryModel.findByIdAndUpdate(productExist.categoryId, { $inc: { productCount: -1 } }, { session });

    await session.commitTransaction();

    res.sendStatus(204);
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    next(error);
  }
};

export const ProductController = { getFilteredProducts, createProduct, updateProduct, deleteProduct, getAllProducts };
