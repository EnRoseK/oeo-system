import { Drawer } from '@/components/ui';
import React, { FC } from 'react';
import { CloseIcon } from '@/assets/icons';
import { PermissionUpdateForm } from './PermissionUpdateForm';
import { IUser } from '@/interfaces';

interface EditUserDrawerProps {
  show: boolean;
  closeHandler: () => void;
  user?: IUser;
}

export const EditUserDrawer: FC<EditUserDrawerProps> = ({ show, closeHandler, user }) => {
  return (
    <Drawer show={show} closeHandler={closeHandler}>
      <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
        Хэрэглэгчийн эрх шинэчлэх
      </h5>
      <button
        onClick={closeHandler}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <CloseIcon width={20} height={20} />
      </button>

      <PermissionUpdateForm
        closeHandler={closeHandler}
        userId={user?._id || ''}
        permission={
          user?.permission || {
            category: { read: true, update: false, delete: false, create: false },
            product: { read: true, update: false, delete: false, create: false },
            productIncome: { read: true, update: false, delete: false, create: false },
            productOutcome: { read: true, update: false, delete: false, create: false },
            productReport: { read: true, update: false, delete: false, create: false },
            incomeReport: { read: true, update: false, delete: false, create: false },
            users: { read: true, update: false, delete: false, create: false },
            expenses: { read: true, update: false, delete: false, create: false },
          }
        }
      />
    </Drawer>
  );
};
