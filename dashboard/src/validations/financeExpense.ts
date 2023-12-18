import * as yup from 'yup';

export const financeExpenseCreateValidation = yup.object().shape({
  type: yup.string().required('Төрөл сонгох шаардлагатай'),
  amount: yup.number().required('Дүн заавал оруулах шаардлагатай'),
  description: yup.string().optional(),
});
