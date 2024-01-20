import { FC, ReactNode } from 'react';

interface TableHeadItemProps {
  children: ReactNode;
}

export const TableHeadItem: FC<TableHeadItemProps> = (props) => {
  const { children } = props;

  return (
    <th scope='col' className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'>
      {children}
    </th>
  );
};
