import { updateUserPassword } from '@/api/services';
import { Input, MediumButton } from '@/components/form';
import { PasswordRequirement } from '@/components/ui';
import { errorHandler } from '@/utils';
import { updateUserPasswordValidation } from '@/validations';
import { Form, Formik, FormikHelpers } from 'formik';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';

export const PasswordForm: FC = () => {
  const [showRequirement, setShowRequirement] = useState<boolean>(false);

  const onSubmitHandler = async (
    values: { oldPassword: string; newPassword: string; repeatNewPassword: string },
    helpers: FormikHelpers<{ oldPassword: string; newPassword: string; repeatNewPassword: string }>,
  ) => {
    try {
      await updateUserPassword(values);

      helpers.resetForm();
      toast.success('Нууц үг амжилттай солигдлоо');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
      <h3 className='mb-4 text-xl font-semibold dark:text-white'>Нууц үг</h3>
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', repeatNewPassword: '' }}
        onSubmit={onSubmitHandler}
        validationSchema={updateUserPasswordValidation}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 sm:col-span-3'>
                <Input
                  type='password'
                  label='Одоогийн нууц үг'
                  id='oldPassword'
                  name='oldPassword'
                  placeholder='••••••••'
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.oldPassword && touched.oldPassword}
                  errorMsg={errors.oldPassword}
                />
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <Input
                  type='password'
                  label='Шинэ нууц үг'
                  id='newPassword'
                  name='newPassword'
                  placeholder='••••••••'
                  onFocus={() => setShowRequirement(true)}
                  onBlur={(e) => {
                    handleBlur(e);
                    setShowRequirement(false);
                  }}
                  value={values.newPassword}
                  onChange={handleChange}
                  error={!!errors.newPassword && touched.newPassword}
                  errorMsg={errors.oldPassword}
                />
                {showRequirement && <PasswordRequirement password={values.newPassword} />}
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <Input
                  type='password'
                  label='Шинэ нууц үг давтах'
                  id='repeatNewPassword'
                  name='repeatNewPassword'
                  placeholder='••••••••'
                  value={values.repeatNewPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.repeatNewPassword && touched.repeatNewPassword}
                  errorMsg={errors.repeatNewPassword}
                />
              </div>
              <div className='col-span-6 sm:col-full'>
                <MediumButton type='submit' disabled={isSubmitting}>
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
