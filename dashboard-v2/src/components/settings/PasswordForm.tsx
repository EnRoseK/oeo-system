import React, { FC } from 'react';
import { Button, Input } from '@/components';

export const PasswordForm: FC = () => {
  return (
    <div className='p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
      <h3 className='mb-4 text-xl font-semibold dark:text-white'>Нууц үг</h3>
      <form>
        <div className='grid grid-cols-6 gap-6'>
          <div className='col-span-6 sm:col-span-3'>
            <Input
              type='password'
              label='Одоогийн нууц үг'
              id='oldPassword'
              name='oldPassword'
              placeholder='••••••••'
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <Input type='password' label='Шинэ нууц үг' id='newPassword' name='newPassword' placeholder='••••••••' />
            {/* {showRequirement && <PasswordRequirement password={values.newPassword} />} */}
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <Input
              type='password'
              label='Шинэ нууц үг давтах'
              id='repeatNewPassword'
              name='repeatNewPassword'
              placeholder='••••••••'
            />
          </div>
          <div className='col-span-6 sm:col-full'>
            <Button type='submit'>Хадгалах</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
