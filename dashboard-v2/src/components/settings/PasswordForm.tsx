import React, { FC } from 'react';
import { Button, Input } from '@/components';
import { Form, Formik } from 'formik';
import { passwordChangeValidation } from '@/validations';
import { errorHandler } from '@/utils';
import { useSession } from 'next-auth/react';
import { authServices } from '@/api/services';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCurrentUser } from '@/hooks';

export const PasswordForm: FC = () => {
  const { data } = useSession();
  const router = useRouter();
  const { removeCurrentUser } = useCurrentUser();

  const submitHandler = async (values: { currentPassword: string; password: string; passwordConfirmation: string }) => {
    try {
      await authServices.changePassword({ jwt: data?.jwt!, values });

      toast.success('Нууц үг амжилттай солигдлоо');

      await signOut({
        redirect: false,
      });
      router.replace('/login');
      removeCurrentUser();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
      <h3 className='mb-4 text-xl font-semibold dark:text-white'>Нууц үг</h3>
      <Formik
        initialValues={{ currentPassword: '', password: '', passwordConfirmation: '' }}
        onSubmit={submitHandler}
        validationSchema={passwordChangeValidation}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 sm:col-span-3'>
                <Input
                  type='password'
                  label='Одоогийн нууц үг'
                  id='currentPassword'
                  name='currentPassword'
                  placeholder='••••••••'
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.currentPassword && touched.currentPassword}
                  errorMsg={errors.currentPassword}
                />
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <Input
                  type='password'
                  label='Шинэ нууц үг'
                  id='password'
                  name='password'
                  placeholder='••••••••'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.password && touched.password}
                  errorMsg={errors.password}
                />
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <Input
                  type='password'
                  label='Шинэ нууц үг давтах'
                  id='passwordConfirmation'
                  name='passwordConfirmation'
                  placeholder='••••••••'
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.passwordConfirmation && touched.passwordConfirmation}
                  errorMsg={errors.passwordConfirmation}
                />
              </div>
              <div className='col-span-6 sm:col-full'>
                <Button type='submit' disabled={isSubmitting}>
                  Хадгалах
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
