import { RequestHandler } from 'express';
import { ProductModel } from '../product/product.model';
import { UserModel } from '../user/user.model';
import { ProductIncomeModel } from '../productIncome/productIncome.model';
import { ProductOutcomeModel } from '../productOutcome/productOutcome.model';

const calculateDifferenceRate = (thisMonth: number, prevMonth: number) => {
  return ((thisMonth - prevMonth) * 100) / (prevMonth || 100);
};

const getHomeStats: RequestHandler = async (req, res, next) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const prevMonth = currentMonth - 1 === 0 ? 12 : currentMonth - 1;
    const prevYear = currentMonth - 1 === 0 ? currentYear - 1 : currentYear;

    const productsCount = await ProductModel.countDocuments();
    const usersCount = await UserModel.countDocuments();
    const thisMonthProductIncomes = await ProductIncomeModel.find({
      createdAt: {
        $gte: new Date(`${currentYear}-${currentMonth}-01`).toISOString(),
        $lte: new Date(`${currentYear}-${currentMonth}-31`).toISOString(),
      },
    });

    const prevMonthProductIncomes = await ProductIncomeModel.find({
      createdAt: {
        $gte: new Date(`${prevYear}-${prevMonth}-01`).toISOString(),
        $lte: new Date(`${prevYear}-${prevMonth}-31`).toISOString(),
      },
    });
    const thisMonthProductOutcomes = await ProductOutcomeModel.find({
      createdAt: {
        $gte: new Date(`${currentYear}-${currentMonth}-01`).toISOString(),
        $lte: new Date(`${currentYear}-${currentMonth}-31`).toISOString(),
      },
    });
    const prevMonthProductOutcomes = await ProductOutcomeModel.find({
      createdAt: {
        $gte: new Date(`${prevYear}-${prevMonth}-01`).toISOString(),
        $lte: new Date(`${prevYear}-${prevMonth}-31`).toISOString(),
      },
    });

    const thisMonthProductIncomeTotal = thisMonthProductIncomes.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const thisMonthProductOutcomeTotal = thisMonthProductOutcomes.reduce((acc, cur) => acc + cur.totalPrice, 0);

    const prevMonthProductIncomeTotal = prevMonthProductIncomes.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const prevMonthProductOutcomeTotal = prevMonthProductOutcomes.reduce((acc, cur) => acc + cur.totalPrice, 0);

    res.status(200).json({
      data: [
        {
          title: 'Нийт урвалжийн тоо',
          stat: productsCount,
        },
        {
          title: 'Нийт хэрэглэгчдийн тоо',
          stat: usersCount,
        },
        {
          title: 'Энэ сарын урвалж орлого',
          stat: thisMonthProductIncomeTotal,
          differenceRate: calculateDifferenceRate(thisMonthProductIncomeTotal, prevMonthProductIncomeTotal),
          isCurrency: true,
        },
        {
          title: 'Энэ сарын шинжилгээ',
          stat: thisMonthProductOutcomeTotal,
          differenceRate: calculateDifferenceRate(thisMonthProductOutcomeTotal, prevMonthProductOutcomeTotal),
          isCurrency: true,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const HomeController = { getHomeStats };
