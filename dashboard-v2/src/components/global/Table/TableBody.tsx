import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export const TableBody: FC<TableBodyProps> = (props) => {
  const { children, className } = props;

  return (
    <tbody className={classNames('bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700', className)}>
      {children}
    </tbody>
  );
};
