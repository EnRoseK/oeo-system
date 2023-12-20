import * as yup from 'yup';
import { emailChecker, passwordChecker } from '@/utils';

export const userCreateValidation = yup.object().shape({
  firstName: yup.string().required('Нэр хоосон байж болохгүй'),
  lastName: yup.string().required('Овог хоосон байж болохгүй'),
  email: yup.string().required('И-мэйл хоосон байж болохгүй').matches(emailChecker, { message: 'И-мэйл буруу байна' }),
  password: yup.string().required('Нууц үг хоосон байж болохгүй').matches(passwordChecker, {
    message: 'Нууц үг шаардлага хангахгүй байна',
  }),
});

export const updateUserInfoValidation = yup.object().shape({
  firstName: yup.string().required('Нэр хоосон байж болохгүй'),
  lastName: yup.string().required('Овог хоосон байж болохгүй'),
  email: yup.string().required('И-мэйл хоосон байж болохгүй').matches(emailChecker, { message: 'И-мэйл буруу байна' }),
});

export const updateUserPasswordValidation = yup.object().shape({
  oldPassword: yup.string().required('Хуучин нууц үг хоосон байж болохгүй'),
  newPassword: yup.string().required('Шинэ нууц үг хоосон байж болохгүй').matches(passwordChecker, {
    message: 'Шинэ нууц үг шаардлага хангахгүй байна',
  }),
  repeatNewPassword: yup
    .string()
    .required('Давтан шинэ нууц үг хоосон байж болохгүй')
    .oneOf([yup.ref('newPassword'), ''], 'Давтан нууц үг, шинэ нууц үгтэй таарахгүй байна'),
});
