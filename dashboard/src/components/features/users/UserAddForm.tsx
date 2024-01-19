import { CloseIcon } from '@/assets/icons';
import { Input, MediumButton } from '@/components/form';
import { PasswordRequirement } from '@/components/ui';
import { IPermission, IPermissionItem } from '@/interfaces';
import { userCreateValidation } from '@/validations';
import { Form, Formik, FormikHelpers } from 'formik';
import { FC, useState } from 'react';

export interface UserInitialValueType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserAddFormProps {
  closeHandler: () => void;
  initialValues: UserInitialValueType;
  onSubmitHandler: (
    values: UserInitialValueType,
    helpers: FormikHelpers<UserInitialValueType>,
    permission: IPermission,
  ) => void;
}

const permissions = [
  { key: 'category', title: 'Ангилал' },
  { key: 'product', title: 'Урвалж' },
  { key: 'productIncome', title: 'Урвалж орлого' },
  { key: 'productOutcome', title: 'Шижилгээ' },
  { key: 'productReport', title: 'Урвалж тайлан' },
  { key: 'incomeReport', title: 'Орлого тайлан' },
  { key: 'users', title: 'Хэрэглэгчид' },
];

const actions = [
  { key: 'read', title: 'Унших' },
  { key: 'create', title: 'Нэмэх' },
  { key: 'update', title: 'Шинэчлэх' },
  { key: 'delete', title: 'Устгах' },
];

export const UserAddForm: FC<UserAddFormProps> = ({ closeHandler, initialValues, onSubmitHandler }) => {
  const [showRequirement, setShowRequirement] = useState<boolean>(false);
  const [initialPermission, setInitialPermission] = useState<IPermission>({
    category: { read: true, update: false, delete: false, create: false },
    product: { read: true, update: false, delete: false, create: false },
    productIncome: { read: true, update: false, delete: false, create: false },
    productOutcome: { read: true, update: false, delete: false, create: false },
    productReport: { read: true, update: false, delete: false, create: false },
    incomeReport: { read: true, update: false, delete: false, create: false },
    users: { read: true, update: false, delete: false, create: false },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => onSubmitHandler(values, helpers, initialPermission)}
      validationSchema={userCreateValidation}
    >
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form>
          <div className='space-y-4'>
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
            <div className='relative'>
              <Input
                label='Нууц үг'
                id='password'
                name='password'
                placeholder='••••••••'
                type='password'
                value={values.password}
                onChange={handleChange}
                onBlur={(e) => {
                  handleBlur(e);
                  setShowRequirement(false);
                }}
                error={!!errors.password && touched.password}
                errorMsg={errors.password}
                onFocus={() => setShowRequirement(true)}
              />
              {showRequirement && <PasswordRequirement password={values.password} />}
            </div>

            {permissions.map((p, index) => {
              return (
                <div key={index} className='space-y-2'>
                  <span className='block text-sm font-medium text-gray-900 dark:text-white'>{p.title}</span>
                  <div className='flex items-center gap-2 justify-between'>
                    {actions.map((a, ind) => {
                      return (
                        <div key={`${index}-${ind}`} className='flex items-center'>
                          <input
                            id={`${p.key}-${a.key}`}
                            type='checkbox'
                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            checked={initialPermission[p.key as keyof IPermission][a.key as keyof IPermissionItem]}
                            onChange={(e) => {
                              setInitialPermission((prev) => ({
                                ...prev,
                                [p.key]: { ...prev[p.key as keyof IPermission], [a.key]: e.target.checked },
                              }));
                            }}
                          />
                          <label
                            htmlFor={`${p.key}-${a.key}`}
                            className='ms-2 text-sm font-medium text-gray-900 dark:text-white'
                          >
                            {a.title}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className='bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute'>
              <MediumButton type='submit' disabled={isSubmitting} width='100%'>
                Нэмэх
              </MediumButton>
              <MediumButton
                type='button'
                disabled={isSubmitting}
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
