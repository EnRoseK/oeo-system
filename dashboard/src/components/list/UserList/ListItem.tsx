import { TableRow, TableRowItem } from '@/components/Table';
import { ActionButtons } from '@/components/ui';
import { useAuth } from '@/hooks';
import { IUser } from '@/interfaces/data/user';
import React, { FC } from 'react';

interface ListItemProps {
  user: IUser;
  number: number;
  editHandler: (user: IUser) => void;
  deleteHandler: (id: string) => void;
}

export const ListItem: FC<ListItemProps> = ({ user, number, editHandler, deleteHandler }) => {
  const { currentUser } = useAuth();

  return (
    <TableRow>
      <TableRowItem>{number}</TableRowItem>
      <TableRowItem>{user.firstName}</TableRowItem>
      <TableRowItem>{user.lastName}</TableRowItem>
      <TableRowItem>{user.email}</TableRowItem>

      <ActionButtons
        editLabel='Эрх шинэчлэх'
        showEdit={currentUser?.permission.users.update}
        showDelete={currentUser?.permission.users.delete}
        editHandler={() => editHandler(user)}
        deleteHandler={() => deleteHandler(user._id)}
      />
    </TableRow>
  );
};
