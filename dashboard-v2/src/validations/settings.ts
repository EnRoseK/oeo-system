import * as yup from 'yup';

export const userInformationValidation = yup.object().shape({
  firstName: yup.string().required('Нэр хоосон байж болохгүй'),
  lastName: yup.string().required('Овог хоосон байж болохгүй'),
  email: yup.string().required('И-мэйл хоосон байж болохгүй').email('И-мэйл буруу байна'),
});

export const passwordChangeValidation = yup.object().shape({
  currentPassword: yup.string().required('Одоогийн нууц үг хоосон байж болохгүй'),
  password: yup
    .string()
    .required('Шинэ нууц үг хоосон байж болохгүй')
    .min(6, 'Нууц үг дор хаяж 6 тэмдэгтийн урттай байх ёстой'),
  passwordConfirmation: yup
    .string()
    .required('Давтан шинэ нууц үг хоосон байж болохгүй')
    .oneOf([yup.ref('password'), ''], 'Давтан нууц үг, шинэ нууц үгтэй таарахгүй байна'),
});
