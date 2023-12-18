import { TableRow, TableRowItem, TableRowItemDescription } from '@/components/Table';
import { ActionButtons } from '@/components/ui';
import { IFinanceExpense } from '@/interfaces';
import React, { FC } from 'react';

interface ListItemProps {
  financeExpense: IFinanceExpense;
  number: number;
  deleteHandler: (id: string) => void;
}

export const ListItem: FC<ListItemProps> = ({ number, financeExpense, deleteHandler }) => {
  return (
    <TableRow>
      <TableRowItem>{number}</TableRowItem>
      <TableRowItem>
        {financeExpense.type
          .replaceAll('PRODUCT', 'Урвалж орлого')
          .replaceAll('SALARY', 'Цалин')
          .replaceAll('RENT', 'Түрээс')
          .replaceAll('TAX', 'Татвар')
          .replaceAll('OTHER', 'Бусад')}
      </TableRowItem>
      <TableRowItem>{financeExpense.amount.toLocaleString()}₮</TableRowItem>
      <TableRowItemDescription>{financeExpense.description}</TableRowItemDescription>
      <TableRowItem>{financeExpense.productIncome?.productIncomeId || '-'}</TableRowItem>
      <TableRowItem>{new Date(financeExpense.createdAt).toLocaleDateString()}</TableRowItem>

      <ActionButtons
        deleteHandler={() => deleteHandler(financeExpense._id)}
        showEdit={false}
        showDelete={financeExpense.type !== 'PRODUCT'}
      />
    </TableRow>
  );
};
