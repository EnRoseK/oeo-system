import React, { FC, ReactNode } from 'react';

interface TableRowItemProps {
  children: ReactNode;
}

export const TableRowItem: FC<TableRowItemProps> = (props) => {
  const { children } = props;

  return <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>{children}</td>;
};
