import { Drawer } from '@/components/ui';
import { FC } from 'react';
import { ProductIncomeAddEditForm, ProductIncomeInitialValueType } from './ProductIncomeAddEditForm';
import { CloseIcon } from '@/assets/icons';
import { IProduct } from '@/interfaces';
import { FormikHelpers } from 'formik';
import { errorHandler } from '@/utils';
import { useRefreshData } from '@/hooks';
import { createProductIncome } from '@/api/services';
import { toast } from 'react-toastify';

interface AddProductIncomeDrawerProps {
  show: boolean;
  closeHandler: () => void;
  products: IProduct[];
}

export const AddProductIncomeDrawer: FC<AddProductIncomeDrawerProps> = ({ show, closeHandler, products = [] }) => {
  const refreshData = useRefreshData();

  const onSubmit = async (
    values: ProductIncomeInitialValueType,
    helpers: FormikHelpers<ProductIncomeInitialValueType>,
  ) => {
    try {
      await createProductIncome(values);

      refreshData();
      closeHandler();
      helpers.resetForm();
      toast.success('Урвалж орлого амжилттай нэмэгдлээ');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Drawer show={show} closeHandler={closeHandler}>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        Урвалж орлого нэмэх
      </h5>
      <button
        onClick={closeHandler}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <CloseIcon width={20} height={20} />
      </button>

      <ProductIncomeAddEditForm
        initialValues={{ productId: '', quantity: 0, basePrice: 0 }}
        onSubmitHandler={onSubmit}
        products={products}
        closeHandler={closeHandler}
      />
    </Drawer>
  );
};
