import { TableRow, TableRowItem } from '@/components/Table';
import { ActionButtons } from '@/components/ui';
import { useAuth } from '@/hooks';
import { IExpense } from '@/interfaces';
import { FC } from 'react';

interface ListItemProps {
  number: number;
  expense: IExpense;
  deleteHandler: (id: string) => void;
}

export const ListItem: FC<ListItemProps> = ({ number, expense, deleteHandler }) => {
  const { currentUser } = useAuth();

  return (
    <TableRow>
      <TableRowItem>{number}</TableRowItem>
      <TableRowItem>{expense.expenseId}</TableRowItem>
      <TableRowItem>{expense.name}</TableRowItem>
      <TableRowItem>{expense.description}</TableRowItem>
      <TableRowItem>
        {expense.type
          .replaceAll('CARD', 'Карт')
          .replaceAll('CASH', 'Бэлэн мөнгө')
          .replaceAll('TRANSFER', 'Шилжүүлэг')
          .replaceAll('RENT', 'Зээл')}
      </TableRowItem>
      <TableRowItem>{expense.amount.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{new Date(expense.createdAt).toLocaleString()}</TableRowItem>

      <ActionButtons
        showDelete={currentUser?.permission.productOutcome.delete}
        deleteHandler={() => deleteHandler(expense._id)}
        showEdit={false}
      />
    </TableRow>
  );
};
