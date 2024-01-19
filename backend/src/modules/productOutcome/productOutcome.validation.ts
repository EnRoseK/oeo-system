import * as yup from 'yup';

export const createProductOutcomeValidation = yup.object().shape({
  body: yup.object().shape({
    productId: yup.string().required('Урвалж сонгох шаардлагатай'),
    basePrice: yup.number().required('Үнэ заавал шаардлагатай'),
    quantity: yup.number().required('Тоо ширхэг заавал шаардлагатай'),
    payment: yup
      .mixed()
      .oneOf(['CARD', 'CASH', 'TRANSFER', 'RENT'], 'Төлбөрийн төрөл буруу байна')
      .required('Төлбөрийн төрөл сонгох шаардлагатай'),
  }),
});
