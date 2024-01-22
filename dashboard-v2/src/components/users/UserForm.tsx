import { FC } from 'react';
import { Button, Input, Select } from '@/components';
import { Form, Formik } from 'formik';
import { CloseIcon } from '@/assets/icons';
import { userCreateValidation, userUpdateValidation } from '@/validations';
import { IRole } from '@/interfaces';

export interface InitialUserValueType {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface UserFormProps {
  closeHandler: () => void;
  initialValues: InitialUserValueType;
  submitHandler: (values: InitialUserValueType) => void;
  roles: IRole[];
  editing?: boolean;
}

export const UserForm: FC<UserFormProps> = (props) => {
  const { closeHandler, initialValues, submitHandler, roles, editing = false } = props;

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
                label='Хэрэглэгчийн нэр'
                id='username'
                name='username'
                placeholder='Хэрэглэгчийн нэр'
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.username && touched.username}
                errorMsg={errors.username}
              />
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
              <Select
                items={roles.map((role) => ({ value: role.id.toString(), label: role.name }))}
                label='Эрх'
                id='role'
                name='role'
                placeHolder='Эрх сонгох'
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.role && touched.role}
                errorMsg={errors.role}
              />
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
