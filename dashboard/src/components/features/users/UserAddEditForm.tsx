import { CloseIcon } from '@/assets/icons';
import { Input, MediumButton, Select } from '@/components/form';
import { PasswordRequirement } from '@/components/ui';
import { userCreateValidation } from '@/validations';
import { Form, Formik, FormikHelpers } from 'formik';
import { FC, useState } from 'react';

export interface UserInitialValueType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'USER' | 'ACCOUNTANT' | 'ADMIN';
}

interface UserAddEditFormProps {
  closeHandler: () => void;
  initialValues: UserInitialValueType;
  onSubmitHandler: (values: UserInitialValueType, helpers: FormikHelpers<UserInitialValueType>) => void;
}

export const UserAddEditForm: FC<UserAddEditFormProps> = ({ closeHandler, initialValues, onSubmitHandler }) => {
  const [showRequirement, setShowRequirement] = useState<boolean>(false);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={userCreateValidation}>
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
            <Select
              label='Үүрэг'
              id='role'
              name='role'
              items={[
                { value: 'USER', label: 'Хэрэглэгч' },
                { value: 'ACCOUNTANT', label: 'Нягтлан' },
                { value: 'ADMIN', label: 'Админ' },
              ]}
              placeHolder='Үүрэг сонгох'
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.role && touched.role}
              errorMsg={errors.role}
            />

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
