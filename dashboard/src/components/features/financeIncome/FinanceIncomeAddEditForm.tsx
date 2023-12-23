import { CloseIcon } from '@/assets/icons';
import { Input, MediumButton, Textarea } from '@/components/form';
import { FC } from 'react';

export const FinanceIncomeAddEditForm: FC = () => {
  return (
    <form>
      <div className='space-y-4'>
        <Input label='Нэр' id='name' name='name' />

        <Input label='Үлдэгдэл' type='number' id='remainder' name='remainder' />

        <Textarea label='Тайлбар' id='description' name='description' />

        <div className='bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute'>
          <MediumButton width='100%'>Нэмэх</MediumButton>
          <MediumButton width='100%' variant='white' Icon={CloseIcon}>
            Цуцлах
          </MediumButton>
        </div>
      </div>
    </form>
  );
};
