import * as yup from 'yup';
import { emailChecker } from '../../utils';

export const loginValidation = yup.object().shape({
  body: yup.object().shape({
    email: yup
      .string()
      .required('И-мэйл хоосон байж болохгүй')
      .matches(emailChecker, { message: 'И-мэйл буруу байна' }),
    password: yup.string().required('Нууц үг хоосон байж болохгүй'),
  }),
});
