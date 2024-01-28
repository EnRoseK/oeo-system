import { CloseIcon } from '@/assets/icons';
import { FC } from 'react';
import { InitialProductValueType, ProductForm } from './ProductForm';
import { ICategory } from '@/interfaces';
import { errorHandler } from '@/utils';
import { productServices } from '@/api/services';
import { useRefreshData } from '@/hooks';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

interface AddProductProps {
  closeHandler: () => void;
  categories: ICategory[];
}

export const AddProduct: FC<AddProductProps> = (props) => {
  const { closeHandler, categories } = props;
  const refreshData = useRefreshData();
  const { data } = useSession();

  const submitHandler = async (values: InitialProductValueType) => {
    try {
      await productServices.createProduct(
        {
          title: values.title,
          description: values.description,
          balance: values.balance,
          product_category: {
            set: [Number(values.category)],
          },
        },
        data?.jwt!,
      );

      closeHandler();
      toast.success('Урвалж амжилттай нэмэгдлээ');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='flex flex-col h-full'>
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

      <ProductForm
        categories={categories}
        initialValue={{ title: '', balance: 0, category: '', description: '' }}
        closeHandler={closeHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
};
