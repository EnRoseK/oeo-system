import { CustomIconProps } from '@/interfaces';
import { FC } from 'react';

export const WarningIcon: FC<CustomIconProps> = ({ width = 48, height = 48, classNames }) => {
	return (
		<svg
			width={width}
			height={height}
			className={classNames}
			aria-hidden='true'
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 20 20'
		>
			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
			/>
		</svg>
	);
};
