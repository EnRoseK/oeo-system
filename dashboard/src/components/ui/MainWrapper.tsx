import React, { FC, ReactNode } from 'react';

interface MainWrapperProps {
	children: ReactNode;
}

export const MainWrapper: FC<MainWrapperProps> = ({ children }) => {
	return (
		<div className='relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900'>
			{children}
		</div>
	);
};
