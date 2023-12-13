import React, { ComponentProps, FC } from 'react';

interface SelectProps extends ComponentProps<'select'> {
  label?: string;
  id?: string;
  name?: string;
  items: { label: string; value: string }[];
  placeHolder?: string;
  error?: boolean;
  errorMsg?: string;
}

export const Select: FC<SelectProps> = ({ label, id, name, items, placeHolder, error, errorMsg, ...rest }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
          error ? 'ring-red-600 border-red-600 dark:ring-red-500 dark:border-red-500' : ''
        }`}
        {...rest}
      >
        <option value=''>{placeHolder}</option>
        {items.map((i, index) => {
          return (
            <option key={index} value={i.value}>
              {i.label}
            </option>
          );
        })}
      </select>
      {error && <p className='italic text-xs mt-1 text-red-600 dark:text-red-500'>{errorMsg}</p>}
    </div>
  );
};
