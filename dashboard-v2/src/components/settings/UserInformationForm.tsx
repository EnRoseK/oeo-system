import { FC } from 'react';
import { Button, Input } from '@/components';

export const UserInformationForm: FC = () => {
  return (
    <div className='p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
      <h3 className='mb-4 text-xl font-semibold dark:text-white'>Ерөнхий мэдээлэл</h3>
      <form>
        <div className='grid grid-cols-6 gap-6'>
          <div className='col-span-6 sm:col-span-3'>
            <Input label='Нэр' id='firstName' name='firstName' placeholder='Нэр' />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <Input label='Овог' id='lastName' name='lastName' placeholder='Овог' />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <Input type='email' label='И-мэйл' id='email' name='email' placeholder='И-мэйл' />
          </div>
          <div className='col-span-6 sm:col-full'>
            <Button type='submit' variant='primary'>
              Хадгалах
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
