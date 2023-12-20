import { updateUserInfo } from '@/api/services';
import { Input, MediumButton } from '@/components/form';
import { useAuth } from '@/hooks';
import { errorHandler } from '@/utils';
import { updateUserInfoValidation } from '@/validations';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { toast } from 'react-toastify';

export const GeneralInformationForm: FC = () => {
  const { currentUser, updateUser } = useAuth();

  const onSubmit = async (values: { firstName: string; lastName: string; email: string }) => {
    try {
      const res = await updateUserInfo(values);

      updateUser(res.data);
      toast.success('Мэдээлэл амжилттай шинэчлэгдлээ');
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
        onSubmit={onSubmit}
        validationSchema={updateUserInfoValidation}
        enableReinitialize
      >
        {({ values, handleBlur, handleChange, errors, touched, isSubmitting }) => (
          <Form>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 sm:col-span-3'>
                <Input
                  label='Нэр'
                  id='firstName'
                  name='firstName'
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.firstName && touched.firstName}
                  errorMsg={errors.firstName}
                  placeholder='Нэр'
                />
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <Input
                  label='Овог'
                  id='lastName'
                  name='lastName'
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.lastName && touched.lastName}
                  errorMsg={errors.lastName}
                  placeholder='Овог'
                />
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <Input
                  type='email'
                  label='И-мэйл'
                  id='email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.email && touched.email}
                  errorMsg={errors.email}
                  placeholder='И-мэйл'
                />
              </div>
              <div className='col-span-6 sm:col-full'>
                <MediumButton disabled={isSubmitting} type='submit' variant='primary'>
                  Хадгалах
                </MediumButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
