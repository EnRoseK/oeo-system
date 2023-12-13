import * as yup from 'yup';

export const createProductIncomeValidation = yup.object().shape({
  body: yup.object().shape({
    productId: yup.string().required('Урвалж сонгох шаардлагатай'),
    basePrice: yup.number().required('Үнэ заавал шаардлагатай'),
    quantity: yup.number().required('Тоо ширхэг заавал шаардлагатай'),
  }),
});
