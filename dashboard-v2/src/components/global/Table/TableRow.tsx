import classNames from 'classnames';
import React, { ComponentProps, FC, ReactNode } from 'react';

interface TableRowProps extends ComponentProps<'tr'> {
  children: ReactNode;
  className?: string;
}

export const TableRow: FC<TableRowProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <tr className={classNames('hover:bg-gray-100 dark:hover:bg-gray-700', className)} {...rest}>
      {children}
    </tr>
  );
};
