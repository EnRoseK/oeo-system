import { Drawer } from '@/components/ui';
import { FC } from 'react';
import { UserAddForm, UserInitialValueType } from './UserAddForm';
import { CloseIcon } from '@/assets/icons';
import { errorHandler } from '@/utils';
import { FormikHelpers } from 'formik';
import { createUser } from '@/api/services';
import { useRefreshData } from '@/hooks';
import { toast } from 'react-toastify';
import { IPermission } from '@/interfaces';

interface AddUserDrawerProps {
  show: boolean;
  closeHandler: () => void;
}

export const AddUserDrawer: FC<AddUserDrawerProps> = ({ show, closeHandler }) => {
  const refreshData = useRefreshData();

  const onSubmit = async (
    values: UserInitialValueType,
    helpers: FormikHelpers<UserInitialValueType>,
    permission: IPermission,
  ) => {
    try {
      await createUser({ ...values, permission });

      refreshData();
      toast.success('Хэрэглэгч амжилттай үүслээ');
      helpers.resetForm();
      closeHandler();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Drawer show={show} closeHandler={closeHandler}>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        Хэрэглэгч нэмэх
      </h5>
      <button
        onClick={closeHandler}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <CloseIcon width={20} height={20} />
      </button>

      <UserAddForm
        closeHandler={closeHandler}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        onSubmitHandler={onSubmit}
      />
    </Drawer>
  );
};
