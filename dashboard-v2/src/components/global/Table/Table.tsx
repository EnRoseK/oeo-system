import { FC, ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

export const Table: FC<TableProps> = (props) => {
  const { children } = props;

  return <table className='min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600'>{children}</table>;
};
