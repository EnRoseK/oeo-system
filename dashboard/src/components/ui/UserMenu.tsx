import { UserMenuItems } from '@/constants';
import Link from 'next/link';
import { FC } from 'react';

export const UserMenu: FC = () => {
	return (
		<div className='absolute top-14 right-2 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600'>
			<div className='px-4 py-3'>
				<p className='text-sm text-gray-900 dark:text-white'>Neil Sims</p>
				<p className='text-sm font-medium text-gray-900 truncate dark:text-gray-300'>
					neil.sims@flowbite.com
				</p>
			</div>
			<ul className='py-1'>
				{UserMenuItems.map((item, index) => {
					return (
						<li key={index}>
							<Link
								href={item.url}
								className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
							>
								{item.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
