import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

interface DatePickerProps {
  changeHandler: (value: DateValueType) => void;
}

export const DatePicker: FC<DatePickerProps> = ({ changeHandler }) => {
  const router = useRouter();
  const [value, setValue] = useState<DateValueType>({
    startDate: (router.query.startDate as string) || null,
    endDate: (router.query.endDate as string) || null,
  });

  return (
    <Datepicker
      value={value}
      onChange={(values) => {
        changeHandler(values);
        setValue(values);
      }}
      inputClassName='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 p-2.5 pl-4 pr-14 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      placeholder='Огноогоор шүүх'
      popoverDirection='down'
    />
  );
};
