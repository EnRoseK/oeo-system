import * as yup from 'yup';

export const productIncomeCreateAndUpdateValidation = yup.object().shape({
  productId: yup.string().required('Урвалж сонгох шаардлагатай'),
  basePrice: yup.number().required('Нэгж үнэ хоосон байж болохгүй'),
  quantity: yup.number().required('Тоо ширхэг хоосон байж болохгүй'),
});
