import { RequestHandler } from 'express';
import { FilterQuery } from 'mongoose';
import { ExpenseModel, IExpense } from './expenses.model';
import { PAGE_SIZE } from '../../constants';
import { createExpenseBody } from './expenses.dto';
import { nanoid } from '../../libs';
import createHttpError from 'http-errors';

const getFilteredExpenses: RequestHandler = async (req, res, next) => {
  try {
    const { page = '1', q = '', startDate, endDate } = req.query;
    const currentPage = Number(page);

    const filterQuery: FilterQuery<IExpense> = { name: new RegExp('^' + q, 'i') };

    if (startDate && endDate) {
      filterQuery.createdAt = {
        $gte: new Date(startDate as string).toISOString(),
        $lte: new Date(endDate as string).toISOString().replace('T00:00:00.000Z', 'T23:59:59.999Z'),
      };
    }

    const expenses = await ExpenseModel.find(filterQuery)
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip((currentPage - 1) * PAGE_SIZE);
    const expensesCount = await ExpenseModel.countDocuments(filterQuery);

    res.status(200).json({
      data: expenses,
      pagination: {
        total: expensesCount,
        currentPage,
        totalPage: Math.ceil(expensesCount / PAGE_SIZE),
      },
    });
  } catch (error) {
    next(error);
  }
};

const createExpense: RequestHandler<unknown, unknown, createExpenseBody, unknown> = async (req, res, next) => {
  try {
    const { name, type, description, amount } = req.body;

    const newExpense = await ExpenseModel.create({
      name,
      type,
      description: description || '',
      expenseId: 'EX' + nanoid(),
      amount,
    });

    res.status(201).json({ data: newExpense });
  } catch (error) {
    next(error);
  }
};

const removeExpense: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const expenseExist = await ExpenseModel.findById(id);
    if (!expenseExist) {
      throw createHttpError(404, 'Зарлага олдсонгүй');
    }

    await ExpenseModel.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const ExpenseController = { getFilteredExpenses, createExpense, removeExpense };
