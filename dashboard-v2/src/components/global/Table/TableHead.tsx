import React, { FC, ReactNode } from 'react';

interface TableHeadProps {
  children: ReactNode;
}

export const TableHead: FC<TableHeadProps> = (props) => {
  const { children } = props;

  return (
    <thead className='bg-gray-100 dark:bg-gray-700'>
      <tr>{children}</tr>
    </thead>
  );
};
