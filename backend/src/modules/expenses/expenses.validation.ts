import * as yup from 'yup';

export const createExpenseValidation = yup.object().shape({
  body: yup.object().shape({
    name: yup.string().required('Гарчиг хоосон байж болохгүй'),
    description: yup.string().optional(),
    type: yup
      .mixed()
      .oneOf(['CARD', 'CASH', 'TRANSFER', 'RENT'], 'Төрөл буруу байна')
      .required('Төрөл сонгох шаардлагатай'),
    amount: yup.number().required('Дүн хоосон байж болохгүй'),
  }),
});
