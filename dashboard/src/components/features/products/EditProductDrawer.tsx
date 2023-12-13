import { Drawer } from '@/components/ui';
import React, { FC } from 'react';
import { ProductAddEditForm, ProductInitialValueType } from './ProductAddEditForm';
import { CloseIcon } from '@/assets/icons';
import { ICategory, IProduct } from '@/interfaces';
import { useRefreshData } from '@/hooks';
import { FormikHelpers } from 'formik';
import { errorHandler } from '@/utils';
import { updateProduct } from '@/api/services';
import { toast } from 'react-toastify';

interface EditProductDrawerProps {
  show: boolean;
  closeHandler: () => void;
  product?: IProduct;
  categories: ICategory[];
}

export const EditProductDrawer: FC<EditProductDrawerProps> = ({ show, closeHandler, product, categories }) => {
  const refreshData = useRefreshData();

  const onSubmit = async (values: ProductInitialValueType, helpers: FormikHelpers<ProductInitialValueType>) => {
    try {
      await updateProduct(product?._id!, values);

      refreshData();
      closeHandler();
      helpers.resetForm();
      toast.success('Урвалж амжилттай шинэчлэгдлээ');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Drawer show={show} closeHandler={closeHandler}>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        Урвалж шинэчлэх
      </h5>
      <button
        onClick={closeHandler}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <CloseIcon width={20} height={20} />
      </button>

      <ProductAddEditForm
        initialValues={{
          title: product?.title || '',
          categoryId: product?.categoryId || '',
          description: product?.description || '',
          remainder: product?.remainder || 0,
        }}
        onSubmitHandler={onSubmit}
        closeHandler={closeHandler}
        categories={categories}
        edit
      />
    </Drawer>
  );
};
