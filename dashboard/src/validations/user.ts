import * as yup from 'yup';
import { emailChecker, passwordChecker } from '@/utils';

export const userCreateValidation = yup.object().shape({
  firstName: yup.string().required('Нэр хоосон байж болохгүй'),
  lastName: yup.string().required('Овог хоосон байж болохгүй'),
  email: yup.string().required('И-мэйл хоосон байж болохгүй').matches(emailChecker, { message: 'И-мэйл буруу байна' }),
  password: yup.string().required('Нууц үг хоосон байж болохгүй').matches(passwordChecker, {
    message: 'Нууц үг шаардлага хангахгүй байна',
  }),
  role: yup
    .mixed<'ADMIN' | 'USER' | 'ACCOUNTANT'>()
    .required('Үүрэг хоосон байж болохгүй')
    .oneOf(['ACCOUNTANT', 'ADMIN', 'USER'], 'Role буруу байна'),
});
