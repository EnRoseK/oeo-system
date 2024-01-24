import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export const Table: FC<TableProps> = (props) => {
  const { children, className } = props;

  return (
    <table className={classNames('min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600', className)}>
      {children}
    </table>
  );
};
