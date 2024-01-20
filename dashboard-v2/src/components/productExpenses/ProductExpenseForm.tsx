import { Form, Formik } from 'formik';
import { FC } from 'react';
import { Button, Input, Select } from '@/components';
import { IProduct } from '@/interfaces';
import { CloseIcon } from '@/assets/icons';
import { productExpenseCreateAndUpdateValidation } from '@/validations';

export interface InitialProductExpenseValueType {
  productId: string;
  basePrice: number;
  quantity: number;
  paymentType: string;
}

interface ProductExpenseFormProps {
  closeHandler: () => void;
  products: IProduct[];
  initialValue: InitialProductExpenseValueType;
  submitHandler: (values: InitialProductExpenseValueType) => void;
}

export const ProductExpenseForm: FC<ProductExpenseFormProps> = (props) => {
  const { closeHandler, products, initialValue, submitHandler } = props;

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={submitHandler}
      validationSchema={productExpenseCreateAndUpdateValidation}
    >
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form className='flex-1'>
          <div className='flex flex-col h-full'>
            <div className='space-y-4 mb-4 flex-1'>
              <Select
                label='Урвалж'
                id='productId'
                name='productId'
                items={products.map((p) => ({ label: p.title, value: p.id.toString() }))}
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
              <Select
                items={[
                  { label: 'Карт', value: 'CARD' },
                  { label: 'Бэлэн мөнгө', value: 'CASH' },
                  { label: 'Шилжүүлэг', value: 'TRANSFER' },
                  { label: 'Зээл', value: 'RENT' },
                ]}
                label='Төлбөрийн төрөл'
                id='paymentType'
                name='paymentType'
                placeHolder='Төрөл сонгох'
                value={values.paymentType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.paymentType && touched.paymentType}
                errorMsg={errors.paymentType}
              />
            </div>

            <div className='flex items-center w-full pb-4 space-x-4'>
              <Button type='submit' fullWidth disabled={isSubmitting}>
                Нэмэх
              </Button>
              <Button
                onClick={closeHandler}
                type='button'
                fullWidth
                variant='white'
                Icon={CloseIcon}
                disabled={isSubmitting}
              >
                Цуцлах
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
