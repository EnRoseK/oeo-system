import * as yup from 'yup';

export const productCreateAndUpdateValidation = yup.object().shape({
  title: yup.string().required('Нэр хоосон байж болохгүй'),
  description: yup.string().optional(),
  category: yup.string().required('Ангилал сонгох шаардлагатай'),
  remainder: yup.number().optional(),
});
