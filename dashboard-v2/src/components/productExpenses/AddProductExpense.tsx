import { CloseIcon } from '@/assets/icons';
import { translations } from '@/constants';
import { IProduct } from '@/interfaces';
import { FC } from 'react';
import { InitialProductExpenseValueType, ProductExpenseForm } from './ProductExpenseForm';
import { errorHandler } from '@/utils';
import { productExpenseServices } from '@/api/services';
import { useRefreshData } from '@/hooks';
import { toast } from 'react-toastify';

interface AddProductExpenseProps {
  closeHandler: () => void;
  products: IProduct[];
}

export const AddProductExpense: FC<AddProductExpenseProps> = (props) => {
  const { closeHandler, products } = props;
  const refreshData = useRefreshData();

  const submitHandler = async (values: InitialProductExpenseValueType) => {
    try {
      await productExpenseServices.createProductExpense({
        basePrice: values.basePrice,
        quantity: values.quantity,
        paymentType: values.paymentType,
        product: {
          set: [Number(values.productId)],
        },
      });

      closeHandler();
      toast.success('Шинжилгээ амжилттай нэмэгдлээ');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        {translations.productExpense} нэмэх
      </h5>
      <button
        onClick={closeHandler}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <CloseIcon width={20} height={20} />
      </button>

      <ProductExpenseForm
        initialValue={{ basePrice: 0, quantity: 0, paymentType: '', productId: '' }}
        products={products}
        closeHandler={closeHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
};
