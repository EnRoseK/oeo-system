import { TableRow, TableRowItem, ActionButtons } from '@/components';
import { IUser } from '@/interfaces';
import { FC } from 'react';

interface ListItemProps {
  user: IUser;
  deleteHandler: (id: number) => void;
  editHandler: (user: IUser) => void;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { user, deleteHandler, editHandler } = props;

  return (
    <TableRow>
      <TableRowItem>{user.id}</TableRowItem>
      <TableRowItem>{user.username}</TableRowItem>
      <TableRowItem>{user.firstName}</TableRowItem>
      <TableRowItem>{user.lastName}</TableRowItem>
      <TableRowItem>{user.email}</TableRowItem>
      <TableRowItem>{user.role.name}</TableRowItem>

      <ActionButtons deleteHandler={() => deleteHandler(user.id)} editHandler={() => editHandler(user)} />
    </TableRow>
  );
};
