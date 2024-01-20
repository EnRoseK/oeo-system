import * as yup from 'yup';

export const expenseCreateAndUpdateValidation = yup.object().shape({
  name: yup.string().required('Нэр хоосон байж болохгүй'),
  description: yup.string().optional(),
  amount: yup.string().required('Дүн хоосон байж болохгүй'),
  type: yup
    .mixed()
    .oneOf(['CARD', 'CASH', 'TRANSFER', 'RENT'], 'Төрөл буруу байна')
    .required('Төрөл сонгох шаардлагатай'),
});
