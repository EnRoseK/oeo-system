import { FC } from 'react';

export const SearchInput: FC = () => {
	return (
		<form className='mb-4 sm:mb-0 sm:pr-3' action='#' method='GET'>
			<label htmlFor='products-search' className='sr-only'>
				Хайх
			</label>
			<div className='relative w-48 mt-1 sm:w-64 xl:w-96'>
				<input
					type='text'
					name='email'
					id='products-search'
					className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
					placeholder='Хайх'
				/>
			</div>
		</form>
	);
};
