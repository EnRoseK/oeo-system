import { FC } from 'react';
import { Button, Input, Select, Textarea } from '@/components';
import { CloseIcon } from '@/assets/icons';
import { ICategory } from '@/interfaces';
import { Form, Formik } from 'formik';
import { productCreateAndUpdateValidation } from '@/validations';

export interface InitialProductValueType {
  title: string;
  description: string;
  category: string;
  balance: number;
}

interface ProductFormProps {
  categories: ICategory[];
  initialValue: InitialProductValueType;
  closeHandler: () => void;
  submitHandler: (values: InitialProductValueType) => void;
  editing?: boolean;
}

export const ProductForm: FC<ProductFormProps> = (props) => {
  const { categories, initialValue, closeHandler, submitHandler, editing = false } = props;

  return (
    <Formik initialValues={initialValue} onSubmit={submitHandler} validationSchema={productCreateAndUpdateValidation}>
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form className='flex-1'>
          <div className='flex flex-col h-full'>
            <div className='space-y-4 mb-4 flex-1'>
              <Input
                label='Нэр'
                id='title'
                name='title'
                placeholder='Урвалжийн нэр'
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.title && touched.title}
                errorMsg={errors.title}
              />

              <Select
                label='Ангилал'
                id='category'
                name='category'
                items={categories.map((c) => ({ value: c.id.toString(), label: c.title }))}
                placeHolder='Ангилал сонгох'
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.category && touched.category}
                errorMsg={errors.category}
              />

              <Textarea
                label='Тайлбар'
                id='description'
                name='description'
                placeholder='Энд урвалжийн талаар дэлгэрэнгүй тайлбар бичих боломжтой'
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.description && touched.description}
                errorMsg={errors.description}
              />

              <Input
                label='Үлдэгдэл'
                type='number'
                id='balance'
                name='balance'
                placeholder='Үлдэгдэл'
                value={values.balance}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.balance && touched.balance}
                errorMsg={errors.balance}
                disabled={editing}
              />
            </div>

            <div className='flex justify-start items-center w-full pb-4 space-x-4'>
              <Button disabled={isSubmitting} type='submit' fullWidth>
                {editing ? 'Хадгалах' : 'Нэмэх'}
              </Button>
              <Button
                onClick={closeHandler}
                disabled={isSubmitting}
                type='button'
                fullWidth
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
