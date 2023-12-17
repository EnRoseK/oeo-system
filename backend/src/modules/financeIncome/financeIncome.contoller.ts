import { RequestHandler } from 'express';
import { FinanceIncomeModel } from './financeIncome.model';
import { PAGE_SIZE } from '../../constants';

const getFilteredFinanceIncomes: RequestHandler = async (req, res, next) => {
  try {
    const { page = '1' } = req.query;
    const currentPage = Number(page);

    const financeIncomes = await FinanceIncomeModel.find()
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip((currentPage - 1) * PAGE_SIZE);

    const financeIncomesCount = await FinanceIncomeModel.countDocuments();

    res
      .status(200)
      .json({
        data: financeIncomes,
        pagination: { total: financeIncomesCount, currentPage, totalPage: Math.ceil(financeIncomesCount / PAGE_SIZE) },
      });
  } catch (error) {
    next(error);
  }
};

export const FinanceIncomeController = { getFilteredFinanceIncomes };
