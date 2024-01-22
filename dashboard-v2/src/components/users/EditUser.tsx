import { CloseIcon } from '@/assets/icons';
import { translations } from '@/constants';
import { IRole, IUser } from '@/interfaces';
import { FC } from 'react';
import { InitialUserValueType, UserForm } from './UserForm';
import { errorHandler } from '@/utils';
import { userServices } from '@/api/services';
import { useRefreshData } from '@/hooks';
import { toast } from 'react-toastify';

interface EditUserProps {
  closeHandler: () => void;
  user: IUser;
  roles: IRole[];
}

export const EditUser: FC<EditUserProps> = (props) => {
  const { closeHandler, user, roles } = props;
  const refreshData = useRefreshData();

  const submitHandler = async (values: InitialUserValueType) => {
    try {
      await userServices.updateUser(user.id, {
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        confirmed: true,
        blocked: false,
        role: {
          connect: [{ id: Number(values.role) }],
          disconnect: [{ id: Number(values.role) }],
        },
      });

      closeHandler();
      toast.success('Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        {translations.users} шинэчлэх
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
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: '',
          role: user.role.id.toString(),
        }}
        roles={roles}
        editing
      />
    </div>
  );
};
