import { CloseIcon } from '@/assets/icons';
import { translations } from '@/constants';
import { FC } from 'react';
import { ExpenseForm, InitialExpenseValueType } from './ExpenseForm';
import { errorHandler } from '@/utils';
import { useRefreshData } from '@/hooks';
import { expenseServices } from '@/api/services';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

interface AddExpenseProps {
  closeHandler: () => void;
}

export const AddExpense: FC<AddExpenseProps> = (props) => {
  const { closeHandler } = props;
  const refreshData = useRefreshData();
  const { data: session } = useSession();

  const submitHandler = async (values: InitialExpenseValueType) => {
    try {
      await expenseServices.createExpense(values, session?.jwt!);

      closeHandler();
      toast.success('Зарлага амжилттай нэмэгдлээ');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        {translations.expense} нэмэх
      </h5>
      <button
        onClick={closeHandler}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <CloseIcon width={20} height={20} />
      </button>

      <ExpenseForm
        closeHandler={closeHandler}
        initialValues={{ name: '', description: '', amount: 0, type: '' }}
        submitHandler={submitHandler}
      />
    </div>
  );
};
