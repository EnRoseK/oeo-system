import { RequestHandler } from 'express';
import { IProductIncome, ProductIncomeModel } from './productIncome.model';
import { PAGE_SIZE } from '../../constants';
import { createProductIncomeBody } from './productIncome.dto';
import { ProductModel } from '../product/product.model';
import createHttpError from 'http-errors';
import mongoose, { FilterQuery } from 'mongoose';
import { nanoid } from '../../libs';

const getFilteredProductIncomes: RequestHandler = async (req, res, next) => {
  try {
    const { page = '1', q = '', product, startDate, endDate } = req.query;
    const currentPage = Number(page);

    const filterQuery: FilterQuery<IProductIncome> = { productIncomeId: new RegExp('^' + q, 'i') };
    if (product) {
      filterQuery.productId = { $in: (product as string).split(',') };
    }
    if (startDate && endDate) {
      filterQuery.createdAt = {
        $gte: new Date(startDate as string).toISOString(),
        $lte: new Date(endDate as string).toISOString().replace('T00:00:00.000Z', 'T23:59:59.999Z'),
      };
    }

    const productIncomes = await ProductIncomeModel.find(filterQuery)
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip((currentPage - 1) * PAGE_SIZE)
      .populate({ path: 'product' });

    const productIncomesCount = await ProductIncomeModel.countDocuments(filterQuery);

    res.status(200).json({
      data: productIncomes,
      pagination: { total: productIncomesCount, currentPage, totalPage: Math.ceil(productIncomesCount / PAGE_SIZE) },
    });
  } catch (error) {
    next(error);
  }
};

const createProductIncome: RequestHandler<unknown, unknown, createProductIncomeBody, unknown> = async (
  req,
  res,
  next,
) => {
  const session = await mongoose.startSession();

  try {
    const { basePrice, productId, quantity } = req.body;

    const productExist = await ProductModel.findById(productId);
    if (!productExist) {
      throw createHttpError(404, 'Сонгосон урвалж олдсонгүй!');
    }

    session.startTransaction();

    const [newProductIncome] = await ProductIncomeModel.create(
      [{ productId, quantity, basePrice, totalPrice: quantity * basePrice, productIncomeId: 'PI' + nanoid() }],
      { session },
    );

    await ProductModel.findByIdAndUpdate(productId, { $inc: { remainder: quantity } }, { session });

    await session.commitTransaction();

    res.status(201).json({ data: newProductIncome });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    next(error);
  }
};

const removeProductIncome: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { id } = req.params;

    const productIncomeExist = await ProductIncomeModel.findById(id);
    if (!productIncomeExist) {
      throw createHttpError(404, 'Урвалж орлого олдсонгүй!');
    }

    session.startTransaction();

    await ProductModel.findByIdAndUpdate(
      productIncomeExist.productId,
      { $inc: { remainder: -productIncomeExist.quantity } },
      { session },
    );

    await ProductIncomeModel.findByIdAndDelete(id);

    await session.commitTransaction();

    res.sendStatus(204);
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    next(error);
  }
};

export const ProductIncomeController = { getFilteredProductIncomes, createProductIncome, removeProductIncome };
