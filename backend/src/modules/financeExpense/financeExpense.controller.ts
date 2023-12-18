import { RequestHandler } from 'express';
import { FinanceExpenseModel } from './financeExpense.model';
import { PAGE_SIZE } from '../../constants';
import { createFinanceExpenseBody } from './financeExpense.dto';
import createHttpError from 'http-errors';

const getFilteredFinanceExpenses: RequestHandler = async (req, res, next) => {
  try {
    const { page = '1' } = req.query;
    const currentPage = Number(page);

    const financeExpenses = await FinanceExpenseModel.find()
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip((currentPage - 1) * PAGE_SIZE)
      .populate({ path: 'productIncome' });

    const financeExpensesCount = await FinanceExpenseModel.countDocuments();

    res.status(200).json({
      data: financeExpenses,
      pagination: {
        total: financeExpensesCount,
        currentPage,
        totalPage: Math.ceil(financeExpensesCount / PAGE_SIZE),
      },
    });
  } catch (error) {
    console.log(error);
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
