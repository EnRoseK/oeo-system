import { RequestHandler } from 'express';
import { UserModel } from '../user/user.model';
import createHttpError from 'http-errors';
import { LoginBody } from './auth.dto';
import * as bcrypt from 'bcrypt';

const getCurrentUser: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId!;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw createHttpError(404, 'Хэрэглэгч олдсонгүй');
    }

    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await UserModel.findOne({ email }).select('+password');
    if (!userExist) {
      throw createHttpError(400, 'И-мэйл эсвэл нууц үг буруу байна');
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
      throw createHttpError(400, 'И-мэйл эсвэл нууц үг буруу байна');
    }

    req.session.userId = userExist._id;

    res.status(200).send({ message: 'Амжилттай нэвтэрлээ' });
  } catch (error) {
    next(error);
  }
};

const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else res.sendStatus(204);
  });
};

export const AuthController = { getCurrentUser, login, logout };
