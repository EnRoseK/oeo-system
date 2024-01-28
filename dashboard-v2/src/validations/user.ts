import * as yup from 'yup';

export const userCreateValidation = yup.object().shape({
  firstName: yup.string().required('Нэр хоосон байж болохгүй'),
  lastName: yup.string().required('Овог хоосон байж болохгүй'),
  email: yup.string().required('И-мэйл хоосон байж болохгүй').email('И-мэйл буруу байна'),
  password: yup
    .string()
    .required('Нууц үг хоосон байж болохгүй')
    .min(6, 'Нууц үг 6-аас дээш тэмдэгтийн урттай байх ёстой'),
});

export const userUpdateValidation = yup.object().shape({
  firstName: yup.string().required('Нэр хоосон байж болохгүй'),
  lastName: yup.string().required('Овог хоосон байж болохгүй'),
  email: yup.string().required('И-мэйл хоосон байж болохгүй').email('И-мэйл буруу байна'),
  password: yup.string().optional().min(6, 'Нууц үг 6-аас дээш тэмдэгтийн урттай байх ёстой'),
});
