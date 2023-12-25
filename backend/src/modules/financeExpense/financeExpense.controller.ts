import { RequestHandler } from 'express';
import { FinanceExpenseModel, IFinanceExpense } from './financeExpense.model';
import { PAGE_SIZE } from '../../constants';
import { createFinanceExpenseBody } from './financeExpense.dto';
import createHttpError from 'http-errors';
import { FilterQuery } from 'mongoose';

const getFilteredFinanceExpenses: RequestHandler = async (req, res, next) => {
  try {
    const { page = '1', type, startDate, endDate } = req.query;
    const currentPage = Number(page);

    const filterQuery: FilterQuery<IFinanceExpense> = {};
    if (type) {
      filterQuery.type = { $in: (type as string).split(',') };
    }
    if (startDate && endDate) {
      filterQuery.createdAt = {
        $gte: new Date(startDate as string).toISOString(),
        $lte: new Date(endDate as string).toISOString(),
      };
    }

    const financeExpenses = await FinanceExpenseModel.find(filterQuery)
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip((currentPage - 1) * PAGE_SIZE)
      .populate({ path: 'productIncome' });

    const financeExpensesCount = await FinanceExpenseModel.countDocuments(filterQuery);

    res.status(200).json({
      data: financeExpenses,
      pagination: {
        total: financeExpensesCount,
        currentPage,
        totalPage: Math.ceil(financeExpensesCount / PAGE_SIZE),
      },
    });
  } catch (error) {
    next(error);
  }
};

const createFinanceExpenses: RequestHandler<unknown, unknown, createFinanceExpenseBody, unknown> = async (
  req,
  res,
  next,
) => {
  try {
    const { type, amount, description } = req.body;

    const newFinanceExpense = await FinanceExpenseModel.create({ type, amount, description: description || '' });

    res.status(201).json({ data: newFinanceExpense });
  } catch (error) {
    next(error);
  }
};

const removeFinanceExpense: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const financeExpenseExist = await FinanceExpenseModel.findById(id);
    if (!financeExpenseExist) throw createHttpError(404, 'Санхүүгийн зарлага олдсонгүй!');

    await FinanceExpenseModel.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const FinanceExpenseContoller = { getFilteredFinanceExpenses, createFinanceExpenses, removeFinanceExpense };
