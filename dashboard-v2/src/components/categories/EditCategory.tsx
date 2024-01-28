import { CloseIcon } from '@/assets/icons';
import { translations } from '@/constants';
import { FC } from 'react';
import { CategoryForm, InitialCategoryValueType } from './CategoryForm';
import { ICategory } from '@/interfaces';
import { errorHandler } from '@/utils';
import { categoryServices } from '@/api/services';
import { useRefreshData } from '@/hooks';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

interface EditCategoryProps {
  closeHandler: () => void;
  category: ICategory;
}

export const EditCategory: FC<EditCategoryProps> = (props) => {
  const { closeHandler, category } = props;
  const refreshData = useRefreshData();
  const { data } = useSession();

  const submitHandler = async (values: InitialCategoryValueType) => {
    try {
      await categoryServices.updateCategory(category.id, values, data?.jwt!);

      closeHandler();
      toast.success('Ангилалын мэдээлэл амжилттай шинэчлэгдлээ');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='flex flex-col h-full'>
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

      <CategoryForm
        initialValues={{ title: category.title, description: category.description || '' }}
        closeHandler={closeHandler}
        submitHandler={submitHandler}
        editing
      />
    </div>
  );
};
