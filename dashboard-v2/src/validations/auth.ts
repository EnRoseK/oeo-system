import * as yup from 'yup';

export const signInValidation = yup.object().shape({
  email: yup.string().required('И-мэйл хоосон байж болохгүй').email('И-мэйл буруу байна'),
  password: yup.string().required('Нууц үг хоосон байж болохгүй'),
});
