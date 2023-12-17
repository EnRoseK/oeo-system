import { RequestHandler } from 'express';
import { ProductOutcomeModel } from './productOutcome.model';
import { PAGE_SIZE } from '../../constants';
import { createProductOutcomeBody } from './productOutcome.dto';
import { ProductModel } from '../product/product.model';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { FinanceIncomeModel } from '../financeIncome/financeIncome.model';

const getFilteredProductOutcomes: RequestHandler = async (req, res, next) => {
  try {
    const { page = '1' } = req.query;
    const currentPage = Number(page);

    const productOutcomes = await ProductOutcomeModel.find()
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip((currentPage - 1) * PAGE_SIZE)
      .populate({ path: 'product' });

    const productOutcomesCount = await ProductOutcomeModel.countDocuments();

    res.status(200).json({
      data: productOutcomes,
      pagination: {
        total: productOutcomesCount,
        currentPage,
        totalPage: Math.ceil(productOutcomesCount / PAGE_SIZE),
      },
    });
  } catch (error) {
    next(error);
  }
};

const createProductOutcome: RequestHandler<unknown, unknown, createProductOutcomeBody, unknown> = async (
  req,
  res,
  next,
) => {
  const session = await mongoose.startSession();

  try {
    const { productId, quantity, basePrice } = req.body;

    const productExist = await ProductModel.exists({ _id: productId });
    if (!productExist) {
      throw createHttpError(404, 'Сонгосон урвалж олдсонгүй!');
    }

    session.startTransaction();

    await ProductModel.findByIdAndUpdate(productId, { $inc: { remainder: -quantity } }, { session });

    const [newProductOutcome] = await ProductOutcomeModel.create(
      [{ productId, quantity, basePrice, totalPrice: quantity * basePrice }],
      { session },
    );

    await FinanceIncomeModel.create(
      [{ type: 'PRODUCT', amount: newProductOutcome.totalPrice, productOutcomeId: newProductOutcome._id }],
      { session },
    );

    await session.commitTransaction();

    res.status(201).json({ data: newProductOutcome });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    next(error);
  }
};

const removeProductOutcome: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { id } = req.params;

    const productOutcomeExist = await ProductOutcomeModel.findById(id);
    if (!productOutcomeExist) {
      throw createHttpError(404, 'Урвалж зарлага олдсонгүй!');
    }

    session.startTransaction();

    await ProductModel.findByIdAndUpdate(
      productOutcomeExist.productId,
      { $inc: { remainder: productOutcomeExist.quantity } },
      { session },
    );

    await ProductOutcomeModel.findByIdAndDelete(id);
    await FinanceIncomeModel.findOneAndDelete({ productOutcomeId: id });

    await session.commitTransaction();

    res.sendStatus(204);
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    next(error);
  }
};

export const ProductOutcomeController = { getFilteredProductOutcomes, createProductOutcome, removeProductOutcome };
