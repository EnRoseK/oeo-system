import { RequestHandler } from 'express';
import { FinanceIncomeModel, IFinanceIncome } from './financeIncome.model';
import { PAGE_SIZE } from '../../constants';
import { FilterQuery } from 'mongoose';

const getFilteredFinanceIncomes: RequestHandler = async (req, res, next) => {
  try {
    const { page = '1', startDate, endDate } = req.query;
    const currentPage = Number(page);

    const filterQuery: FilterQuery<IFinanceIncome> = {};
    if (startDate && endDate) {
      filterQuery.createdAt = {
        $gte: new Date(startDate as string).toISOString(),
        $lte: new Date(endDate as string).toISOString(),
      };
    }

    const financeIncomes = await FinanceIncomeModel.find(filterQuery)
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip((currentPage - 1) * PAGE_SIZE)
      .populate({ path: 'productOutcome' });

    const financeIncomesCount = await FinanceIncomeModel.countDocuments(filterQuery);

    res.status(200).json({
      data: financeIncomes,
      pagination: { total: financeIncomesCount, currentPage, totalPage: Math.ceil(financeIncomesCount / PAGE_SIZE) },
    });
  } catch (error) {
    next(error);
  }
};

export const FinanceIncomeController = { getFilteredFinanceIncomes };
