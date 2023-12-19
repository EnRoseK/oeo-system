import { login } from '@/api/services';
import { Input, MediumButton } from '@/components/form';
import { useAuth } from '@/hooks';
import { errorHandler } from '@/utils';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { toast } from 'react-toastify';

export const LoginForm: FC = () => {
  const router = useRouter();
  const { fetchCurrentUser } = useAuth();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await login(values);
      await fetchCurrentUser();

      toast.success(res.message);
      router.replace('/');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800'>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Нэвтрэх</h2>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
        {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
          <Form className='mt-8 space-y-6' action='#'>
            <Input
              type='email'
              label='И-мэйл'
              id='email'
              name='email'
              placeholder='example@example.com'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.email && touched.email}
              errorMsg={errors.email}
            />
            <Input
              type='password'
              label='Нууц үг'
              id='password'
              name='password'
              placeholder='••••••••'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.password && touched.password}
              errorMsg={errors.password}
            />

            <MediumButton disabled={isSubmitting} type='submit'>
              Нэвтрэх
            </MediumButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};
