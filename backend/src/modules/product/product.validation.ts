import * as yup from 'yup';

export const createAndUpdateProductValidation = yup.object().shape({
  body: yup.object().shape({
    title: yup.string().required('Нэр заавал шаардлагатай'),
    categoryId: yup.string().required('Ангилал заавал сонгох шаардлагатай'),
    description: yup.string().optional(),
    remainder: yup.number().optional(),
  }),
});
