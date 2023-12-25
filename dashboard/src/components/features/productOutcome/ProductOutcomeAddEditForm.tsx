import { CloseIcon } from '@/assets/icons';
import { Input, MediumButton, Select } from '@/components/form';
import { IProduct } from '@/interfaces';
import { productOutcomeCreateAndUpdateValidation } from '@/validations';
import { Form, Formik, FormikHelpers } from 'formik';
import { FC } from 'react';

export interface ProductOutcomeInitialValuesType {
  productId: string;
  basePrice: number;
  quantity: number;
}

interface ProductOutcomeAddEditFormProps {
  products: IProduct[];
  initialValues: ProductOutcomeInitialValuesType;
  onSubmitHandler: (
    values: ProductOutcomeInitialValuesType,
    helpers: FormikHelpers<ProductOutcomeInitialValuesType>,
  ) => void;
  closeHandler: () => void;
}

export const ProductOutcomeAddEditForm: FC<ProductOutcomeAddEditFormProps> = ({
  products,
  initialValues,
  onSubmitHandler,
  closeHandler,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={productOutcomeCreateAndUpdateValidation}
    >
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form>
          <div className='space-y-4'>
            <Select
              items={products.map((p) => ({ label: p.title, value: p._id }))}
              label='Урвалж'
              id='productId'
              name='productId'
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
              disabled
              value={values.basePrice * values.quantity}
              placeholder='Нийт үнэ'
            />

            <div className='bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute'>
              <MediumButton disabled={isSubmitting} type='submit' width='100%'>
                Нэмэх
              </MediumButton>
              <MediumButton
                onClick={closeHandler}
                disabled={isSubmitting}
                type='button'
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
