import { CloseIcon } from '@/assets/icons';
import { Input, MediumButton, Select, Textarea } from '@/components/form';
import { financeExpenseCreateValidation } from '@/validations';
import { Form, Formik, FormikHelpers } from 'formik';
import { FC } from 'react';

export interface FinanceExpenseInitialValueType {
  type: string;
  amount: number;
  description: string;
}

interface FinanceExpenseAddEditFormProps {
  closeHandler: () => void;
  initialValues: FinanceExpenseInitialValueType;
  onSubmitHandler: (
    values: FinanceExpenseInitialValueType,
    helpers: FormikHelpers<FinanceExpenseInitialValueType>,
  ) => void;
}

export const FinanceExpenseAddEditForm: FC<FinanceExpenseAddEditFormProps> = ({
  closeHandler,
  initialValues,
  onSubmitHandler,
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={financeExpenseCreateValidation}>
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form>
          <div className='space-y-4'>
            <Select
              items={[
                { label: 'Цалин', value: 'SALARY' },
                { label: 'Түрээс', value: 'RENT' },
                { label: 'Татвар', value: 'TAX' },
                { label: 'Бусад', value: 'OTHER' },
              ]}
              label='Төрөл'
              id='type'
              name='type'
              placeHolder='Төрлөө сонгоно уу'
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.type && touched.type}
              errorMsg={errors.type}
            />

            <Input
              type='number'
              id='amount'
              name='amount'
              label='Дүн'
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.amount && touched.amount}
              errorMsg={errors.type}
              placeholder='Дүн'
            />

            <Textarea
              id='description'
              name='description'
              label='Тайлбар'
              rows={5}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.description && touched.description}
              errorMsg={errors.description}
              placeholder='Энд орлогын талаар дэлгэрэнгүй тайлбар бичих боломжтой'
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
