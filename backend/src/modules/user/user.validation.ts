import * as yup from 'yup';
import { emailChecker, passwordChecker } from '../../utils';

export const createUserValidation = yup.object().shape({
  body: yup.object({
    firstName: yup.string().required('Нэр хоосон байж болохгүй'),
    lastName: yup.string().required('Овог хоосон байж болохгүй'),
    email: yup
      .string()
      .required('И-мэйл хоосон байж болохгүй')
      .matches(emailChecker, { message: 'И-мэйл буруу байна' }),
    password: yup.string().required('Нууц үг хоосон байж болохгүй').matches(passwordChecker, {
      message: 'Нууц үг шаардлага хангахгүй байна',
    }),
    role: yup
      .mixed<'ADMIN' | 'USER' | 'ACCOUNTANT'>()
      .optional()
      .oneOf(['ACCOUNTANT', 'ADMIN', 'USER'], 'Role буруу байна'),
  }),
});
