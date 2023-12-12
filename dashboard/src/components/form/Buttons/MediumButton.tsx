import { CustomIconProps } from '@/interfaces';
import { ComponentProps, FC, ReactNode } from 'react';
import { IconType } from 'react-icons';

const classNames = {
	primary:
		'disabled:pointer-events-none inline-flex items-center justify-center text-center text-white bg-primary-700 disabled:bg-primary-700/50 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 disabled:dark:bg-primary-600/50 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800',
	white:
		'disabled:pointer-events-none inline-flex items-center justify-center text-gray-500 bg-white disabled:bg-white/50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 disabled:dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600',
	danger:
		'disabled:pointer-events-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center',
};

interface MediumButtonProps extends ComponentProps<'button'> {
	children: ReactNode;
	width?: string | number;
	variant?: 'primary' | 'white' | 'danger';
	Icon?: FC<CustomIconProps> | IconType;
}

export const MediumButton: FC<MediumButtonProps> = ({
	children,
	width = 'max-content',
	variant = 'primary',
	Icon,
	...rest
}) => {
	return (
		<button style={{ width }} className={classNames[variant]} type='button' {...rest}>
			{Icon && (
				<span className='mr-2'>
					<Icon width={20} height={20} size={20} />
				</span>
			)}
			{children}
		</button>
	);
};
