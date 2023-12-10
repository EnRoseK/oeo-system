import { CustomIconProps } from '@/interfaces';
import { ComponentProps, FC, ReactNode } from 'react';
import { IconType } from 'react-icons';

interface SmallButtonProps extends ComponentProps<'button'> {
	children: ReactNode;
	variant: 'primary' | 'danger';
	Icon?: FC<CustomIconProps> | IconType;
}

export const SmallButton: FC<SmallButtonProps> = ({ children, variant, Icon, ...rest }) => {
	const className =
		variant === 'primary'
			? 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
			: variant === 'danger'
			? 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900'
			: '';

	return (
		<button type='button' className={className} {...rest}>
			{Icon && (
				<span className='mr-2'>
					<Icon width={16} height={16} size={16} />
				</span>
			)}
			{children}
		</button>
	);
};
