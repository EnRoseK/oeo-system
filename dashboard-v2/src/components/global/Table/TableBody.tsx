import React, { FC, ReactNode } from 'react';

interface TableBodyProps {
  children: ReactNode;
}

export const TableBody: FC<TableBodyProps> = (props) => {
  const { children } = props;

  return <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>{children}</tbody>;
};
