import { updateUserPermission } from '@/api/services';
import { CloseIcon } from '@/assets/icons';
import { MediumButton } from '@/components/form';
import { useAuth, useRefreshData } from '@/hooks';
import { IPermission, IPermissionItem } from '@/interfaces';
import { errorHandler } from '@/utils';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';

const permissions = [
  { key: 'category', title: 'Ангилал' },
  { key: 'product', title: 'Урвалж' },
  { key: 'productIncome', title: 'Урвалж орлого' },
  { key: 'productOutcome', title: 'Шижилгээ' },
  { key: 'expenses', title: 'Зарлага' },
  { key: 'productReport', title: 'Урвалж тайлан' },
  { key: 'incomeReport', title: 'Орлого тайлан' },
  { key: 'users', title: 'Хэрэглэгчид' },
];

const actions = [
  { key: 'read', title: 'Унших' },
  { key: 'create', title: 'Нэмэх' },
  { key: 'update', title: 'Шинэчлэх' },
  { key: 'delete', title: 'Устгах' },
];

interface PermissionUpdateFormProps {
  permission: IPermission;
  closeHandler: () => void;
  userId: string;
}

export const PermissionUpdateForm: FC<PermissionUpdateFormProps> = ({ permission, closeHandler, userId }) => {
  const refreshData = useRefreshData();
  const { currentUser, updateUser } = useAuth();
  const [initialPermission, setInitialPermission] = useState<IPermission>(permission);

  const onSubmit = async () => {
    try {
      const res = await updateUserPermission(userId, initialPermission);

      if (currentUser?._id === userId) {
        updateUser({ ...currentUser, permission: initialPermission });
      }
      refreshData();

      toast.success(res.message);
      closeHandler();
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className='space-y-4'
    >
      {permissions.map((p, index) => {
        return (
          <div key={index} className='space-y-2'>
            <span className='block text-sm font-medium text-gray-900 dark:text-white'>{p.title}</span>
            <div className='flex items-center gap-2 justify-between'>
              {actions.map((a, ind) => {
                return (
                  <div key={`${index}-${ind}`} className='flex items-center'>
                    <input
                      id={`${p.key}-${a.key}`}
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      checked={initialPermission[p.key as keyof IPermission][a.key as keyof IPermissionItem]}
                      onChange={(e) => {
                        setInitialPermission((prev) => ({
                          ...prev,
                          [p.key]: { ...prev[p.key as keyof IPermission], [a.key]: e.target.checked },
                        }));
                      }}
                    />
                    <label
                      htmlFor={`${p.key}-${a.key}`}
                      className='ms-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      {a.title}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className='bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute'>
        <MediumButton type='submit' width='100%'>
          Хадгалах
        </MediumButton>
        <MediumButton onClick={closeHandler} type='button' width='100%' variant='white' Icon={CloseIcon}>
          Цуцлах
        </MediumButton>
      </div>
    </form>
  );
};
