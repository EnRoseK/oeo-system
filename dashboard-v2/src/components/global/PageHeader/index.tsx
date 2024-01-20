import { FC, ReactNode } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { IBreadcrumbItem } from '@/interfaces';
import { useRouter } from 'next/router';
import { Button, SearchInput } from '@/components';

interface PageHeaderProps {
  breadcrumbItems: IBreadcrumbItem[];
  title: string;
  addBtnHandler?: () => void;
  showAddBtn?: boolean;
  extraFilters?: ReactNode;
  showSearch?: boolean;
}

export const PageHeader: FC<PageHeaderProps> = (props) => {
  const { breadcrumbItems, title, addBtnHandler, showAddBtn = true, extraFilters, showSearch = true } = props;

  const router = useRouter();

  const searchSubmit = (s: string) => {
    if (s) {
      router.push({ query: { ...router.query, page: 1, search: s } });
    } else {
      delete router.query.search;
      router.push({ query: { ...router.query, page: 1 } });
    }
  };

  return (
    <div className='p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700'>
      <div className='w-full mb-1'>
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4'>{title}</h1>
        <div className='items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-0'>
            {showSearch && <SearchInput submitHandler={searchSubmit} initialValue={router.query.search as string} />}
            {extraFilters}
          </div>
          {showAddBtn && addBtnHandler && <Button onClick={addBtnHandler}>Нэмэх</Button>}
        </div>
      </div>
    </div>
  );
};
