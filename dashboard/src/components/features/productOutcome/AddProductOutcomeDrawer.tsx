import { Drawer } from '@/components/ui';
import { FC } from 'react';
import { ProductOutcomeAddEditForm, ProductOutcomeInitialValuesType } from './ProductOutcomeAddEditForm';
import { CloseIcon } from '@/assets/icons';
import { IProduct } from '@/interfaces';
import { FormikHelpers } from 'formik';
import { useRefreshData } from '@/hooks';
import { errorHandler } from '@/utils';
import { createProductOutcome } from '@/api/services';
import { toast } from 'react-toastify';
import { translations } from '@/constants';

interface AddProductOutcomeDrawerProps {
  products: IProduct[];
  show: boolean;
  closeHandler: () => void;
}

export const AddProductOutcomeDrawer: FC<AddProductOutcomeDrawerProps> = ({ products, show, closeHandler }) => {
  const refreshData = useRefreshData();

  const onSubmit = async (
    values: ProductOutcomeInitialValuesType,
    helpers: FormikHelpers<ProductOutcomeInitialValuesType>,
  ) => {
    try {
      await createProductOutcome(values);

      refreshData();
      toast.success(`${translations.productOutcome} амжилттай нэмэгдлээ`);
      helpers.resetForm();
      closeHandler();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Drawer show={show} closeHandler={closeHandler}>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        {translations.productOutcome} нэмэх
      </h5>
      <button
        onClick={closeHandler}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <CloseIcon width={20} height={20} />
      </button>

      <ProductOutcomeAddEditForm
        products={products}
        initialValues={{ productId: '', basePrice: 0, quantity: 0, payment: '' }}
        onSubmitHandler={onSubmit}
        closeHandler={closeHandler}
      />
    </Drawer>
  );
};
