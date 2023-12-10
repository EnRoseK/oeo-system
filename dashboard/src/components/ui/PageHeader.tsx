import { FC } from 'react';
import { Breadcrumbs } from '.';
import { IBreadcrumbItem } from '@/interfaces';
import { CheckboxDropdown, MediumButton, SearchInput } from '../form';

interface PageHeaderProps {
	breadcrumbItems: IBreadcrumbItem[];
	title: string;
	addBtnHandler: () => void;
}

export const PageHeader: FC<PageHeaderProps> = ({ breadcrumbItems, title, addBtnHandler }) => {
	return (
		<div className='p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700'>
			<div className='w-full mb-1'>
				<Breadcrumbs items={breadcrumbItems} />
				<h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4'>
					{title}
				</h1>
				<div className='items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700'>
					<div className='flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-0'>
						<SearchInput />
						<CheckboxDropdown />
						<CheckboxDropdown />
					</div>
					<MediumButton onClick={addBtnHandler}>Нэмэх</MediumButton>
				</div>
			</div>
		</div>
	);
};
