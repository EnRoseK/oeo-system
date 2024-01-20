import { FC } from 'react';
import { Button, Input, Textarea } from '@/components';
import { CloseIcon } from '@/assets/icons';
import { Form, Formik } from 'formik';
import { categoryCreateAndUpdateValidation } from '@/validations';

export interface InitialCategoryValueType {
  title: string;
  description: string;
}

interface CategoryFormProps {
  initialValues: InitialCategoryValueType;
  closeHandler: () => void;
  submitHandler: (values: InitialCategoryValueType) => void;
  editing?: boolean;
}

export const CategoryForm: FC<CategoryFormProps> = (props) => {
  const { initialValues, closeHandler, submitHandler, editing = false } = props;

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler} validationSchema={categoryCreateAndUpdateValidation}>
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form className='flex-1'>
          <div className='flex flex-col h-full'>
            <div className='space-y-4 mb-4 flex-1'>
              <Input
                label='Нэр'
                id='title'
                name='title'
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.title && touched.title}
                errorMsg={errors.title}
                placeholder='Ангилалын нэр'
              />

              <Textarea
                label='Тайлбар'
                id='description'
                name='description'
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.description && touched.description}
                errorMsg={errors.description}
                placeholder='Энд ангилалын талаар дэлгэрэнгүй тайлбар бичих боломжтой'
                rows={5}
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
                disabled={isSubmitting}
                variant='white'
                Icon={CloseIcon}
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
