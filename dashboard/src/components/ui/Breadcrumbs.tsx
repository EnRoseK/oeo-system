import { HomeIcon, SeparatorIcon } from '@/assets/icons';
import { translations } from '@/constants';
import { IBreadcrumbItem } from '@/interfaces';
import Link from 'next/link';
import { FC } from 'react';

interface BreadcrumbsProps {
	items: IBreadcrumbItem[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
	return (
		<nav className='flex mb-4'>
			<ol className='inline-flex items-center space-x-1 text-sm font-medium md:space-x-2'>
				<li className='inline-flex items-center'>
					<Link
						href='/'
						className='inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white'
					>
						<span className='mr-2.5'>
							<HomeIcon />
						</span>
						{translations.dashboard}
					</Link>
				</li>
				{items.map((item, index, arr) => {
					const isLast = arr.length - 1 === index;

					return (
						<li key={index}>
							<div className='flex items-center'>
								<span className='text-gray-400'>
									<SeparatorIcon />
								</span>
								{isLast ? (
									<span className='ml-1 text-gray-400 md:ml-2 dark:text-gray-500'>
										{item.title}
									</span>
								) : (
									<Link
										href={item.url}
										className='ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white'
									>
										{item.title}
									</Link>
								)}
							</div>
						</li>
					);
				})}
			</ol>
		</nav>
	);
};
