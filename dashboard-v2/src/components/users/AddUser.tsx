import { CloseIcon } from '@/assets/icons';
import { translations } from '@/constants';
import { FC } from 'react';
import { InitialUserValueType, UserForm } from './UserForm';
import { errorHandler } from '@/utils';
import { IRole } from '@/interfaces';
import { useRefreshData } from '@/hooks';
import { userServices } from '@/api/services';
import { toast } from 'react-toastify';

interface AddUserProps {
  closeHandler: () => void;
  roles: IRole[];
}

export const AddUser: FC<AddUserProps> = (props) => {
  const { closeHandler, roles } = props;
  const refreshData = useRefreshData();

  const submitHandler = async (values: InitialUserValueType) => {
    try {
      await userServices.createUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        confirmed: true,
        blocked: false,
        role: {
          set: [Number(values.role)],
        },
        password: values.password,
        username: values.username,
      });

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
        roles={roles}
        closeHandler={closeHandler}
        submitHandler={submitHandler}
        initialValues={{
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: '',
        }}
      />
    </div>
  );
};
