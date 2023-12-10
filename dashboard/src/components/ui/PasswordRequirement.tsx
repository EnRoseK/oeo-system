import { FC } from 'react';

export const PasswordRequirement: FC = () => {
	return (
		<div className='absolute z-10 visible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'>
			<div className='p-3 space-y-2'>
				<h3 className='font-semibold text-gray-900 dark:text-white'>
					Must have at least 6 characters
				</h3>
				<div className='grid grid-cols-4 gap-2'>
					<div className='h-1 bg-orange-300 dark:bg-orange-400' />
					<div className='h-1 bg-orange-300 dark:bg-orange-400' />
					<div className='h-1 bg-gray-200 dark:bg-gray-600' />
					<div className='h-1 bg-gray-200 dark:bg-gray-600' />
				</div>
				<p>It’s better to have:</p>
				<ul>
					<li className='flex items-center mb-1'>
						<svg
							className='w-4 h-4 mr-2 text-green-400 dark:text-green-500'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
								clipRule='evenodd'
							/>
						</svg>
						Upper &amp; lower case letters
					</li>
					<li className='flex items-center mb-1'>
						<svg
							className='w-4 h-4 mr-2 text-gray-300 dark:text-gray-400'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
						A symbol (#$&amp;)
					</li>
					<li className='flex items-center'>
						<svg
							className='w-4 h-4 mr-2 text-gray-300 dark:text-gray-400'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
						A longer password (min. 12 chars.)
					</li>
				</ul>
			</div>
		</div>
	);
};
