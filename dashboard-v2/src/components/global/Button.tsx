import { ComponentProps, FC, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { CustomIconProps } from '@/interfaces';
import { IconType } from 'react-icons';

const button = cva(
  'inline-flex items-center justify-center text-center disabled:pointer-events-none font-medium rounded-lg text-sm',
  {
    variants: {
      variant: {
        primary:
          'text-white bg-primary-700 disabled:bg-primary-700/50 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 disabled:dark:bg-primary-600/50 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800',
        white:
          'text-gray-500 bg-white disabled:bg-white/50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 hover:text-gray-900 focus:z-10 dark:bg-gray-700 disabled:dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600',
        danger:
          'text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800',
      },
      size: {
        medium: 'px-5 py-2.5',
        small: 'px-3 py-2',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-max',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      fullWidth: false,
    },
  },
);

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof button> {
  children: ReactNode;
  Icon?: FC<CustomIconProps> | IconType;
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, variant, size, fullWidth, Icon, ...rest } = props;
  const iconSize = size === 'medium' ? 20 : 16;

  return (
    <button className={button({ variant, size, fullWidth })} {...rest}>
      {Icon && (
        <span className='mr-2'>
          <Icon width={iconSize} height={iconSize} size={iconSize} />
        </span>
      )}
      {children}
    </button>
  );
};
