import React, { FC, ReactNode } from 'react';

interface TableRowItemDescriptionProps {
  children: ReactNode;
}

export const TableRowItemDescription: FC<TableRowItemDescriptionProps> = (props) => {
  const { children } = props;

  return (
    <td className='max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
      {children}
    </td>
  );
};
