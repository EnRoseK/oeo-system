import { NextIcon, PrevIcon } from '@/assets/icons';
import { PAGE_SIZE } from '@/constants';
import { IPagination } from '@/interfaces';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface PaginationProps {
	pagination: IPagination;
}

export const Pagination: FC<PaginationProps> = ({ pagination }) => {
	const router = useRouter();

	const nextPage = () => {
		router.push({ query: { ...router.query, page: pagination.currentPage + 1 } });
	};

	const prevPage = () => {
		router.push({ query: { ...router.query, page: pagination.currentPage - 1 } });
	};

	return (
		<div className='sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700'>
			<div className='flex items-center mb-4 sm:mb-0'>
				<button
					onClick={prevPage}
					disabled={pagination.currentPage === 1}
					type='button'
					className='inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white disabled:pointer-events-none disabled:text-gray-500/50'
				>
					<PrevIcon />
				</button>
				<button
					onClick={nextPage}
					disabled={pagination.currentPage === pagination.totalPage}
					type='button'
					className='inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white disabled:pointer-events-none disabled:text-gray-500/50'
				>
					<NextIcon />
				</button>
				<span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
					Нийт{' '}
					<span className='font-semibold text-gray-900 dark:text-white'>{pagination.total}</span>{' '}
					илэрцээс{' '}
					<span className='font-semibold text-gray-900 dark:text-white'>
						{(pagination.currentPage - 1) * PAGE_SIZE + 1}-
						{pagination.currentPage * PAGE_SIZE > pagination.total
							? pagination.total
							: pagination.currentPage * PAGE_SIZE}
					</span>{' '}
					дахийг харуулж байна
				</span>
			</div>
		</div>
	);
};
