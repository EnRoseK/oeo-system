import { CookieOptions, SessionOptions } from 'express-session';
import { envalid } from './envalid';
import MongoStore from 'connect-mongo';

const cookieConfig: CookieOptions = {
  maxAge: 60 * 60 * 1000,
};

if (envalid.NODE_ENV === 'production') {
  cookieConfig.secure = false;
  cookieConfig.sameSite = false;
  cookieConfig.httpOnly = false;
  cookieConfig.domain = '.onch-enkh-onosh.com';
}

export const sessionConfig: SessionOptions = {
  secret: envalid.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: cookieConfig,
  rolling: true,
  store: MongoStore.create({
    mongoUrl: envalid.MONGO_DB,
  }),
};
