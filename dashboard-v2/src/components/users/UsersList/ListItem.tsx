import { TableRow, TableRowItem, ActionButtons } from '@/components';
import { IUser } from '@/interfaces';
import { FC } from 'react';

interface ListItemProps {
  user: IUser;
  deleteHandler: (id: number) => void;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { user, deleteHandler } = props;

  return (
    <TableRow>
      <TableRowItem>{user.id}</TableRowItem>
      <TableRowItem>{user.firstName}</TableRowItem>
      <TableRowItem>{user.lastName}</TableRowItem>
      <TableRowItem>{user.email}</TableRowItem>

      <ActionButtons showEdit={false} deleteHandler={() => deleteHandler(user.id)} />
    </TableRow>
  );
};
