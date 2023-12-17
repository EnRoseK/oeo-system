import { TableRow, TableRowItem } from '@/components/Table';
import { IFinanceIncome } from '@/interfaces';
import React, { FC } from 'react';

interface ListItemProps {
  financeIncome: IFinanceIncome;
  number: number;
}

export const ListItem: FC<ListItemProps> = ({ financeIncome, number }) => {
  return (
    <TableRow>
      <TableRowItem>{number}</TableRowItem>
      <TableRowItem>{financeIncome.type.replaceAll('PRODUCT', 'Шинжилгээ')}</TableRowItem>
      <TableRowItem>{financeIncome.amount.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{new Date(financeIncome.createdAt).toLocaleDateString()}</TableRowItem>
    </TableRow>
  );
};
