import { FC, ReactNode } from 'react';

interface DrawerProps {
	children: ReactNode;
	show: boolean;
	closeHandler: () => void;
}

export const Drawer: FC<DrawerProps> = ({ children, show, closeHandler }) => {
	return (
		<>
			{show && (
				<>
					<div
						className='fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800'
						tabIndex={-1}
					>
						{children}
					</div>

					<div
						onClick={closeHandler}
						className='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30'
					></div>
				</>
			)}
		</>
	);
};
