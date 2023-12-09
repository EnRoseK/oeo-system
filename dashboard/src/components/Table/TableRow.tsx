import React, { FC, ReactNode } from 'react';

interface TableRowProps {
	children: ReactNode;
}

export const TableRow: FC<TableRowProps> = ({ children }) => {
	return <tr className='hover:bg-gray-100 dark:hover:bg-gray-700'>{children}</tr>;
};
