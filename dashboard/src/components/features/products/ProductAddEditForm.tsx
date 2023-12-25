import { CloseIcon } from '@/assets/icons';
import { Input, MediumButton, Select, Textarea } from '@/components/form';
import { ICategory } from '@/interfaces';
import { FC } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { productCreateAndUpdateValidation } from '@/validations';

export interface ProductInitialValueType {
  title: string;
  categoryId: string;
  remainder: number;
  description: string;
}

interface ProductAddEditFormProps {
  categories: ICategory[];
  initialValues: ProductInitialValueType;
  closeHandler: () => void;
  onSubmitHandler: (values: ProductInitialValueType, helpers: FormikHelpers<ProductInitialValueType>) => void;
  edit?: boolean;
}

export const ProductAddEditForm: FC<ProductAddEditFormProps> = ({
  categories,
  initialValues,
  closeHandler,
  onSubmitHandler,
  edit = false,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={productCreateAndUpdateValidation}
    >
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form>
          <div className='space-y-4'>
            <Input
              label='Нэр'
              id='title'
              name='title'
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.title && touched.title}
              errorMsg={errors.title}
              placeholder='Урвалжийн нэр'
            />

            <Select
              label='Ангилал'
              id='categoryId'
              name='categoryId'
              items={categories.map((c) => ({ value: c._id, label: c.title }))}
              placeHolder='Ангилал сонгох'
              value={values.categoryId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.categoryId && touched.categoryId}
              errorMsg={errors.categoryId}
            />

            <Textarea
              label='Тайлбар'
              id='description'
              name='description'
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.description && touched.description}
              errorMsg={errors.description}
              placeholder='Энд урвалжийн талаар дэлгэрэнгүй тайлбар бичих боломжтой'
            />

            <Input
              label='Үлдэгдэл'
              type='number'
              id='remainder'
              name='remainder'
              value={values.remainder}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.remainder && touched.remainder}
              errorMsg={errors.remainder}
              disabled={edit}
              placeholder='Үлдэгдэл'
            />

            <div className='bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute'>
              <MediumButton disabled={isSubmitting} type='submit' width='100%'>
                {edit ? 'Хадгалах' : 'Нэмэх'}
              </MediumButton>
              <MediumButton
                disabled={isSubmitting}
                type='button'
                onClick={closeHandler}
                width='100%'
                variant='white'
                Icon={CloseIcon}
              >
                Цуцлах
              </MediumButton>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
