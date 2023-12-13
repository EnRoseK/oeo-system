import { Drawer } from '@/components/ui';
import { FC } from 'react';
import { ProductAddEditForm, ProductInitialValueType } from './ProductAddEditForm';
import { CloseIcon } from '@/assets/icons';
import { ICategory } from '@/interfaces';
import { FormikHelpers } from 'formik';
import { errorHandler } from '@/utils';
import { createProduct } from '@/api/services';
import { useRefreshData } from '@/hooks';
import { toast } from 'react-toastify';

interface AddProductDrawerProps {
  show: boolean;
  closeHandler: () => void;
  categories: ICategory[];
}

const initialValues = {
  title: '',
  categoryId: '',
  remainder: 0,
  description: '',
};

export const AddProductDrawer: FC<AddProductDrawerProps> = ({ show, closeHandler, categories }) => {
  const refreshData = useRefreshData();

  const onSubmit = async (values: ProductInitialValueType, helpers: FormikHelpers<ProductInitialValueType>) => {
    try {
      await createProduct(values);

      refreshData();
      closeHandler();
      helpers.resetForm();
      toast.success('Урвалж амжилттай нэмэгдлээ');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Drawer show={show} closeHandler={closeHandler}>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        Урвалж нэмэх
      </h5>
      <button
        onClick={closeHandler}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <CloseIcon width={20} height={20} />
      </button>

      <ProductAddEditForm
        categories={categories}
        closeHandler={closeHandler}
        initialValues={initialValues}
        onSubmitHandler={onSubmit}
      />
    </Drawer>
  );
};
