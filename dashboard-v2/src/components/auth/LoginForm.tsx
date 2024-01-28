import { FC } from 'react';
import { Button, Input } from '@/components';
import { Form, Formik } from 'formik';
import { signInValidation } from '@/validations';
import { errorHandler } from '@/utils';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export const LoginForm: FC = () => {
  const router = useRouter();

  const submitHandler = async (values: { email: string; password: string }) => {
    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!result?.ok) {
        throw new Error();
      }

      toast.success('Амжилттай нэвтэрлээ');
      router.replace('/');
    } catch (error) {
      errorHandler(error, 'И-мэйл эсвэл нууц үг буруу байна!');
    }
  };

  return (
    <div className='w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800'>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Нэвтрэх</h2>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={submitHandler} validationSchema={signInValidation}>
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form className='mt-8 space-y-6'>
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

            <Button type='submit' disabled={isSubmitting}>
              Нэвтрэх
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
