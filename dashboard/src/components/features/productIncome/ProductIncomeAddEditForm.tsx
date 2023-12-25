import { CloseIcon } from '@/assets/icons';
import { Input, MediumButton, Select } from '@/components/form';
import { IProduct } from '@/interfaces';
import { FormikHelpers } from 'formik';
import { FC } from 'react';
import { Form, Formik } from 'formik';
import { productIncomeCreateAndUpdateValidation } from '@/validations';

export interface ProductIncomeInitialValueType {
  productId: string;
  basePrice: number;
  quantity: number;
}

interface ProductIncomeAddEditFormProps {
  products: IProduct[];
  closeHandler: () => void;
  initialValues: ProductIncomeInitialValueType;
  onSubmitHandler: (
    values: ProductIncomeInitialValueType,
    helpers: FormikHelpers<ProductIncomeInitialValueType>,
  ) => void;
}

export const ProductIncomeAddEditForm: FC<ProductIncomeAddEditFormProps> = ({
  products,
  closeHandler,
  initialValues,
  onSubmitHandler,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={productIncomeCreateAndUpdateValidation}
    >
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form>
          <div className='space-y-4'>
            <Select
              label='Урвалж'
              id='productId'
              name='productId'
              items={products.map((p) => ({ label: p.title, value: p._id }))}
              placeHolder='Урвалж сонгох'
              value={values.productId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.productId && touched.productId}
              errorMsg={errors.productId}
            />

            <Input
              label='Нэгж үнэ'
              type='number'
              id='basePrice'
              name='basePrice'
              value={values.basePrice}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.basePrice && touched.basePrice}
              errorMsg={errors.basePrice}
              placeholder='Нэгж үнэ'
            />
            <Input
              label='Тоо ширхэг'
              type='number'
              id='quantity'
              name='quantity'
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.quantity && touched.quantity}
              errorMsg={errors.quantity}
              placeholder='Тоо ширхэг'
            />
            <Input
              label='Нийт үнэ'
              type='number'
              id='totalPrice'
              name='totalPrice'
              value={values.basePrice * values.quantity}
              disabled
              placeholder='Нийт үнэ'
            />

            <div className='bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute'>
              <MediumButton disabled={isSubmitting} type='submit' width='100%'>
                Нэмэх
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
