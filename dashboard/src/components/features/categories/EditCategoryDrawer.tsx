import { Drawer } from '@/components/ui';
import React, { FC } from 'react';
import { CategoryAddEditForm, CategoryInitialValuesType } from './CategoryAddEditForm';
import { CloseIcon } from '@/assets/icons';
import { ICategory } from '@/interfaces';
import { FormikHelpers } from 'formik';
import { updateCategory } from '@/api/services';
import { toast } from 'react-toastify';
import { errorHandler } from '@/utils';
import { translations } from '@/constants';
import { useRefreshData } from '@/hooks';

interface EditCategoryDrawerProps {
  show: boolean;
  closeHandler: () => void;
  category?: ICategory;
}

export const EditCategoryDrawer: FC<EditCategoryDrawerProps> = ({ show, closeHandler, category }) => {
  const refreshData = useRefreshData();

  const onSubmit = async (values: CategoryInitialValuesType, helpers: FormikHelpers<CategoryInitialValuesType>) => {
    try {
      await updateCategory(category?._id || '', values);

      toast.success('Ангилал амжилттай шинэчлэгдлээ');
      helpers.resetForm();

      closeHandler();
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Drawer show={show} closeHandler={closeHandler}>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        {translations.categories} шинэчлэх
      </h5>
      <button
        onClick={closeHandler}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <CloseIcon width={20} height={20} />
      </button>

      <CategoryAddEditForm
        closeHandler={closeHandler}
        initialValues={{ title: category?.title || '', description: category?.description || '' }}
        submitHandler={onSubmit}
        edit
      />
    </Drawer>
  );
};
