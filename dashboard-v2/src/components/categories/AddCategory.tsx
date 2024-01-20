import { CloseIcon } from '@/assets/icons';
import { translations } from '@/constants';
import React, { FC } from 'react';
import { CategoryForm, InitialCategoryValueType } from './CategoryForm';
import { errorHandler } from '@/utils';
import { useRefreshData } from '@/hooks';
import { categoryServices } from '@/api/services';
import { toast } from 'react-toastify';

interface AddCategoryProps {
  closeHandler: () => void;
}

export const AddCategory: FC<AddCategoryProps> = (props) => {
  const { closeHandler } = props;
  const refreshData = useRefreshData();

  const submitHandler = async (values: InitialCategoryValueType) => {
    try {
      await categoryServices.createCategory(values);

      closeHandler();
      toast.success('Ангилал амжилттай нэмэгдлээ');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        {translations.categories} нэмэх
      </h5>
      <button
        onClick={closeHandler}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <CloseIcon width={20} height={20} />
      </button>

      <CategoryForm
        initialValues={{ title: '', description: '' }}
        closeHandler={closeHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
};
