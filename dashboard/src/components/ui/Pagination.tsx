import { NextIcon, PrevIcon } from '@/assets/icons';
import { FC } from 'react';

export const Pagination: FC = () => {
	return (
		<div className='sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700'>
			<div className='flex items-center mb-4 sm:mb-0'>
				<button
					type='button'
					className='inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
				>
					<PrevIcon />
				</button>
				<button
					type='button'
					className='inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
				>
					<NextIcon />
				</button>
				<span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
					Нийт <span className='font-semibold text-gray-900 dark:text-white'>2290</span>-с{' '}
					<span className='font-semibold text-gray-900 dark:text-white'>1-20</span> дахийг харуулж
					байна
				</span>
			</div>
		</div>
	);
};
