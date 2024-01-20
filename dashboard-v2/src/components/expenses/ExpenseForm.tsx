import { FC } from 'react';
import { Button, Input, Select, Textarea } from '@/components';
import { CloseIcon } from '@/assets/icons';
import { Form, Formik } from 'formik';
import { expenseCreateAndUpdateValidation } from '@/validations';

export interface InitialExpenseValueType {
  name: string;
  description: string;
  type: string;
  amount: number;
}

interface ExpenseFormProps {
  closeHandler: () => void;
  initialValues: InitialExpenseValueType;
  submitHandler: (values: InitialExpenseValueType) => void;
}

export const ExpenseForm: FC<ExpenseFormProps> = (props) => {
  const { closeHandler, initialValues, submitHandler } = props;

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler} validationSchema={expenseCreateAndUpdateValidation}>
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form className='flex-1'>
          <div className='flex flex-col h-full'>
            <div className='space-y-4 mb-4 flex-1'>
              <Input
                label='Нэр'
                id='name'
                name='name'
                placeholder='Зарлагын нэр'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.name && touched.name}
                errorMsg={errors.name}
              />

              <Textarea
                label='Тайлбар'
                id='description'
                name='description'
                placeholder='Энд зарлагын талаар дэлгэрэнгүй тайлбар бичих боломжтой'
                rows={5}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.description && touched.description}
                errorMsg={errors.description}
              />

              <Select
                label='Төрөл'
                id='type'
                name='type'
                placeHolder='Төрөл сонгох'
                items={[
                  { value: 'CARD', label: 'Карт' },
                  { value: 'CASH', label: 'Бэлэн мөнгө' },
                  { value: 'TRANSFER', label: 'Шилжүүлэг' },
                  { value: 'RENT', label: 'Зээл' },
                ]}
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.type && touched.type}
                errorMsg={errors.type}
              />

              <Input
                label='Дүн'
                id='amount'
                name='amount'
                placeholder='Зарлагын дүн'
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.amount && touched.amount}
                errorMsg={errors.amount}
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
