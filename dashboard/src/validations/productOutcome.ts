import * as yup from 'yup';

export const productOutcomeCreateAndUpdateValidation = yup.object().shape({
  productId: yup.string().required('Урвалж сонгох шаардлагатай'),
  basePrice: yup.number().required('Нэгж үнэ хоосон байж болохгүй'),
  quantity: yup.number().required('Тоо ширхэг хоосон байж болохгүй'),
  payment: yup
    .mixed()
    .oneOf(['CARD', 'CASH', 'TRANSFER', 'RENT'], 'Төлбөрийн төрөл буруу байна')
    .required('Төлбөрийн төрөл сонгох шаардлагатай'),
});
