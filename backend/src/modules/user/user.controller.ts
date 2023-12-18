import { RequestHandler } from 'express';
import { UserModel } from './user.model';
import { PAGE_SIZE } from '../../constants';
import { CreateUserBody } from './user.dto';
import createHttpError from 'http-errors';

const getFilterdUsers: RequestHandler = async (req, res, next) => {
  try {
    const { page = '1' } = req.query;
    const currentPage = Number(page);

    const users = await UserModel.find()
      .limit(PAGE_SIZE)
      .skip((currentPage - 1) * PAGE_SIZE)
      .sort({ createdAt: -1 });

    const usersCount = await UserModel.countDocuments();

    res.status(200).json({
      data: users,
      pagination: { total: usersCount, currentPage, totalPage: Math.ceil(usersCount / PAGE_SIZE) },
    });
  } catch (error) {
    next(error);
  }
};

const createUser: RequestHandler<unknown, unknown, CreateUserBody, unknown> = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, role } = req.body;

    const userWithEmailExist = await UserModel.exists({ email });
    if (userWithEmailExist) {
      throw createHttpError(400, 'И-мэйл бүртгэгдсэн байна!');
    }

    const newUser = await UserModel.create({ email, firstName, lastName, password, role: role || 'USER' });

    res.status(201).json({ data: newUser });
  } catch (error) {
    next(error);
  }
};

const removeUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userExist = await UserModel.findById(id);
    if (!userExist) throw createHttpError(404, 'Хэрэглэгч олдсонгүй!');

    await UserModel.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const UserController = { getFilterdUsers, createUser, removeUser };
