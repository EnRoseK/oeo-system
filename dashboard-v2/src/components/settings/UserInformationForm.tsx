import { FC } from 'react';
import { Button, Input } from '@/components';
import { useCurrentUser } from '@/hooks';
import { Form, Formik } from 'formik';
import { errorHandler } from '@/utils';
import { userInformationValidation } from '@/validations';
import { userServices } from '@/api/services';
import { toast } from 'react-toastify';

export const UserInformationForm: FC = () => {
  const { currentUser, updateCurrentUser } = useCurrentUser();

  const submitHandler = async (values: { firstName: string; lastName: string; email: string }) => {
    try {
      const res = await userServices.updateUser(currentUser?.id!, values);

      toast.success('Мэдээлэл амжилттай шинэчлэгдлээ');
      updateCurrentUser(res);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
      <h3 className='mb-4 text-xl font-semibold dark:text-white'>Ерөнхий мэдээлэл</h3>
      <Formik
        initialValues={{
          firstName: currentUser?.firstName || '',
          lastName: currentUser?.lastName || '',
          email: currentUser?.email || '',
        }}
        onSubmit={submitHandler}
        validationSchema={userInformationValidation}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 sm:col-span-3'>
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
              </div>
              <div className='col-span-6 sm:col-span-3'>
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
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <Input
                  type='email'
                  label='И-мэйл'
                  id='email'
                  name='email'
                  placeholder='И-мэйл'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.email && touched.email}
                  errorMsg={errors.email}
                />
              </div>
              <div className='col-span-6 sm:col-full'>
                <Button type='submit' variant='primary' disabled={isSubmitting}>
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
