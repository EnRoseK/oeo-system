import classNames from 'classnames';
import { ComponentProps, FC } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: boolean;
  errorMsg?: string;
  fullWidth?: boolean;
}

export const Input: FC<InputProps> = (props) => {
  const { label, error = false, errorMsg, fullWidth = true, ...rest } = props;

  return (
    <div>
      {label && (
        <label htmlFor={rest.id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          {label}
        </label>
      )}
      <input
        className={classNames(
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500  disabled:pointer-events-none disabled:bg-gray-50/50 disabled:dark:bg-gray-700/50 disabled:dark:text-white/50 disabled:text-gray-900/50',
          { 'ring-red-600 border-red-600 dark:ring-red-500 dark:border-red-500': error, 'w-full': fullWidth },
        )}
        {...rest}
      />
      {error && <p className='italic text-xs mt-1 text-red-600 dark:text-red-500'>{errorMsg}</p>}
    </div>
  );
};
