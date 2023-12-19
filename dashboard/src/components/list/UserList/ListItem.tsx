import { TableRow, TableRowItem } from '@/components/Table';
import { ActionButtons } from '@/components/ui';
import { IUser } from '@/interfaces/data/user';
import React, { FC } from 'react';

interface ListItemProps {
  user: IUser;
  number: number;
  editHandler: () => void;
  deleteHandler: () => void;
}

export const ListItem: FC<ListItemProps> = ({ user, number, editHandler, deleteHandler }) => {
  return (
    <TableRow>
      <TableRowItem>{number}</TableRowItem>
      <TableRowItem>{user.firstName}</TableRowItem>
      <TableRowItem>{user.lastName}</TableRowItem>
      <TableRowItem>{user.email}</TableRowItem>
      <TableRowItem>
        {user.role.replaceAll('ADMIN', 'Админ').replaceAll('ACCOUNTANT', 'Нягтлан').replaceAll('USER', 'Хэрэглэгч')}
      </TableRowItem>

      <ActionButtons editHandler={editHandler} deleteHandler={deleteHandler} />
    </TableRow>
  );
};
