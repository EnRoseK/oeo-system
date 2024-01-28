import { CloseIcon } from '@/assets/icons';
import { translations } from '@/constants';
import { FC, useState } from 'react';
import { InitialUserValueType, UserForm } from './UserForm';
import { errorHandler } from '@/utils';
import { useRefreshData } from '@/hooks';
import { userServices } from '@/api/services';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

interface AddUserProps {
  closeHandler: () => void;
}

export const AddUser: FC<AddUserProps> = (props) => {
  const { closeHandler } = props;
  const refreshData = useRefreshData();
  const { data: session } = useSession();

  const [permission, setPermission] = useState({
    category: false,
    expense: false,
    incomeReport: false,
    product: false,
    productExpense: false,
    productIncome: false,
    productReport: false,
    user: false,
  });

  const changePermission = (
    key:
      | 'category'
      | 'expense'
      | 'incomeReport'
      | 'product'
      | 'productExpense'
      | 'productIncome'
      | 'productReport'
      | 'user',
  ) => {
    setPermission((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const submitHandler = async (values: InitialUserValueType) => {
    try {
      const username = uuidv4();

      await userServices.createUser(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          confirmed: true,
          blocked: false,
          role: {
            connect: [
              {
                id: 1,
              },
            ],
          },
          password: values.password,
          username,
          permission,
        },
        session?.jwt!,
      );

      closeHandler();
      toast.success('Хэрэглэгч амжилттай нэмэгдлээ');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        {translations.users} нэмэх
      </h5>
      <button
        onClick={closeHandler}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <CloseIcon width={20} height={20} />
      </button>

      <UserForm
        closeHandler={closeHandler}
        submitHandler={submitHandler}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        permission={permission}
        changePermission={changePermission}
      />
    </div>
  );
};
