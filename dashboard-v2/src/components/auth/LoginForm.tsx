import { FC } from 'react';
import { Button, Input } from '@/components';

export const LoginForm: FC = () => {
  return (
    <div className='w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800'>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Нэвтрэх</h2>
      <form className='mt-8 space-y-6'>
        <Input type='email' label='И-мэйл' id='email' name='email' placeholder='example@example.com' />
        <Input type='password' label='Нууц үг' id='password' name='password' placeholder='••••••••' />

        <Button type='submit'>Нэвтрэх</Button>
      </form>
    </div>
  );
};
