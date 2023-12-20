import { RequestHandler } from 'express';
import { UserModel } from './user.model';
import { PAGE_SIZE } from '../../constants';
import {
  createUserBody,
  updateUserInfoBody,
  updateUserPasswordBody,
  updateUserPermissionBody,
  updateUserPermissionParams,
} from './user.dto';
import createHttpError from 'http-errors';
import * as bcrypt from 'bcrypt';

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

const createUser: RequestHandler<unknown, unknown, createUserBody, unknown> = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, permission } = req.body;

    const userWithEmailExist = await UserModel.exists({ email });
    if (userWithEmailExist) {
      throw createHttpError(400, 'И-мэйл бүртгэгдсэн байна!');
    }

    const newUser = await UserModel.create({ email, firstName, lastName, password, permission });

    res.status(201).json({ data: newUser });
  } catch (error) {
    next(error);
  }
};

const updateUserPermission: RequestHandler<
  updateUserPermissionParams,
  unknown,
  updateUserPermissionBody,
  unknown
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userExist = await UserModel.findById(id);
    if (!userExist) throw createHttpError(404, 'Хэрэглэгч олдсонгүй!');

    const { permission } = req.body;
    await UserModel.findByIdAndUpdate(id, { permission });

    res.status(200).json({ message: 'Хэрэглчийн эрх амжилттай шинэчлэгдлээ' });
  } catch (error) {
    next(error);
  }
};

const changeUserInfo: RequestHandler<unknown, unknown, updateUserInfoBody, unknown> = async (req, res, next) => {
  const userId = req.session.userId!;

  try {
    const { email, firstName, lastName } = req.body;
    const userWithEmailExist = await UserModel.findOne({ email });
    if (userWithEmailExist) throw createHttpError(400, 'Энэ и-мэйл бүртгэгдсэн байна!');

    const updatedUser = await UserModel.findByIdAndUpdate(userId, { email, firstName, lastName }, { new: true });

    res.status(200).json({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

const changeUserPassword: RequestHandler<unknown, unknown, updateUserPasswordBody, unknown> = async (
  req,
  res,
  next,
) => {
  const userId = req.session.userId!;

  try {
    const { oldPassword, newPassword } = req.body;

    const user = await UserModel.findById(userId).select('+password');
    if (!user) throw createHttpError(400, 'Хэрэглэгч олдсонгүй');

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) throw createHttpError(400, 'Хуучин нууц үг буруу байна');

    const salt = await bcrypt.genSalt(12);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await UserModel.findByIdAndUpdate(userId, { password: hashedNewPassword });

    res.status(200).json({ message: 'Нууц үг амжилттай солигдлоо' });
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

export const UserController = {
  getFilterdUsers,
  createUser,
  removeUser,
  changeUserInfo,
  changeUserPassword,
  updateUserPermission,
};
