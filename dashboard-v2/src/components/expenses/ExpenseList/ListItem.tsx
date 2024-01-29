import { TableRow, TableRowItem, TableRowItemDescription, ActionButtons } from '@/components';
import { IExpense } from '@/interfaces';
import { convertNumberToCurrency } from '@/utils';
import { convertDateToString } from '@/utils/convertDateToString';
import { FC } from 'react';

interface ListItemProps {
  expense: IExpense;
  editHandler: (category: IExpense) => void;
  deleteHandler: (id: number) => void;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { expense, editHandler, deleteHandler } = props;

  return (
    <TableRow>
      <TableRowItem>{expense.id}</TableRowItem>
      <TableRowItem>{expense.name}</TableRowItem>
      <TableRowItemDescription>{expense.description}</TableRowItemDescription>
      <TableRowItem>
        {expense.type
          .replaceAll('CARD', 'Карт')
          .replaceAll('CASH', 'Бэлэг мөнгө')
          .replaceAll('TRANSFER', 'Шилжүүлэг')
          .replaceAll('RENT', 'Зээл')}
      </TableRowItem>
      <TableRowItem>{convertNumberToCurrency(expense.amount)}</TableRowItem>
      <TableRowItem>{convertDateToString(new Date(expense.createdAt))}</TableRowItem>
      <ActionButtons
        editHandler={() => editHandler(expense)}
        deleteHandler={() => deleteHandler(expense.id)}
        showEdit
        showDelete
      />
    </TableRow>
  );
};
