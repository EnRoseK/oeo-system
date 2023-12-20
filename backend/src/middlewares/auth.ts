import { NextFunction, Request, RequestHandler, Response } from 'express';
import createHttpError from 'http-errors';
import { UserModel } from '../modules/user/user.model';

export const authorizeUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    if (!userId) throw new Error();

    const userExist = await UserModel.findById(userId);
    if (!userExist) throw new Error();

    next();
  } catch (error) {
    next(createHttpError(401, 'Хэрэглэгч нэвтрээгүй байна'));
  }
};

export const checkUserPermission =
  (
    module:
      | 'category'
      | 'product'
      | 'productIncome'
      | 'productOutcome'
      | 'financeIncome'
      | 'financeExpense'
      | 'users'
      | 'log',
    action: 'read' | 'create' | 'update' | 'delete',
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.userId!;

      const userExist = await UserModel.findById(userId);
      if (!userExist) throw new Error();

      if (!userExist.permission[module][action]) throw new Error();

      next();
    } catch (error) {
      next(createHttpError(403, 'Танд энэ үйлдлийг хийх эрх байхгүй байна!'));
    }
  };
