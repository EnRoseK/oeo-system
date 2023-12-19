import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel } from '../modules/user/user.model';

export const authenticateUser: RequestHandler = async (req, res, next) => {
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

export const authorizeAccountant: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.session.userId!;
    const user = await UserModel.findById(userId);

    if (user!.role !== 'ADMIN' && user!.role !== 'ACCOUNTANT') {
      throw new Error();
    }

    next();
  } catch (error) {
    next(createHttpError(403, 'Танд энэ үйлдлийг хийх эрх байхгүй байна'));
  }
};

export const authorizeAdmin: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.session.userId!;
    const user = await UserModel.findById(userId);

    if (user!.role !== 'ADMIN') {
      throw new Error();
    }

    next();
  } catch (error) {
    next(createHttpError(403, 'Танд энэ үйлдлийг хийх эрх байхгүй байна'));
  }
};
