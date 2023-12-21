import 'dotenv/config';
import { cleanEnv } from 'envalid';
import { port, str } from 'envalid/dist/validators';

export const envalid = cleanEnv(process.env, {
  MONGO_DB: str(),
  PORT: port(),
  SESSION_SECRET: str(),
  CLIENT_URL: str(),
  NODE_ENV: str(),
});
