import { FC } from 'react';
import { Button, Input, Toggle } from '@/components';
import { Form, Formik } from 'formik';
import { CloseIcon } from '@/assets/icons';
import { userCreateValidation, userUpdateValidation } from '@/validations';

const permissions = [
  { name: 'Урвалж ангилал', key: 'category' },
  { name: 'Урвалжууд', key: 'product' },
  { name: 'Урвалж орлого', key: 'productIncome' },
  { name: 'Шинжилгээ', key: 'productExpense' },
  { name: 'Зарлага', key: 'expense' },
  { name: 'Урвалж тайлан', key: 'productReport' },
  { name: 'Орлого тайлан', key: 'incomeReport' },
  { name: 'Хэрэглэгчид', key: 'user' },
] as const;

export interface InitialUserValueType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserFormProps {
  closeHandler: () => void;
  initialValues: InitialUserValueType;
  submitHandler: (values: InitialUserValueType) => void;
  editing?: boolean;
  permission: {
    category: boolean;
    product: boolean;
    productIncome: boolean;
    productExpense: boolean;
    expense: boolean;
    productReport: boolean;
    incomeReport: boolean;
    user: boolean;
  };
  changePermission: (
    key:
      | 'category'
      | 'expense'
      | 'incomeReport'
      | 'product'
      | 'productExpense'
      | 'productIncome'
      | 'productReport'
      | 'user',
  ) => void;
}

export const UserForm: FC<UserFormProps> = (props) => {
  const { closeHandler, initialValues, submitHandler, editing = false, permission, changePermission } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={editing ? userUpdateValidation : userCreateValidation}
    >
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form className='flex-1'>
          <div className='flex flex-col h-full'>
            <div className='space-y-4 mb-4 flex-1'>
              <Input
                label='Нэр'
                id='firstName'
                name='firstName'
                placeholder='Нэр'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.firstName && touched.firstName}
                errorMsg={errors.firstName}
              />
              <Input
                label='Овог'
                id='lastName'
                name='lastName'
                placeholder='Овог'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.lastName && touched.lastName}
                errorMsg={errors.lastName}
              />
              <Input
                label='И-мэйл'
                id='email'
                name='email'
                placeholder='И-мэйл'
                type='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email && touched.email}
                errorMsg={errors.email}
              />
              <Input
                label='Нууц үг'
                id='password'
                name='password'
                placeholder='Нууц үг'
                type='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password && touched.password}
                errorMsg={errors.password}
              />
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Эрх</label>
                <div className='flex flex-col gap-4'>
                  {permissions.map((p, index) => {
                    return (
                      <Toggle
                        key={index}
                        label={p.name}
                        id={p.key}
                        checked={permission[p.key]}
                        onChange={(e) => {
                          changePermission(p.key);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className='flex items-center w-full pb-4 space-x-4'>
              <Button type='submit' fullWidth disabled={isSubmitting}>
                {editing ? 'Хадгалах' : 'Нэмэх'}
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
