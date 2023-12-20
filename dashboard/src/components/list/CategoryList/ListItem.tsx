import { TableRow, TableRowItem, TableRowItemDescription } from '@/components/Table';
import { ActionButtons } from '@/components/ui';
import { useAuth } from '@/hooks';
import { ICategory } from '@/interfaces';
import { FC } from 'react';

interface ListItemProps {
  category: ICategory;
  editHandler: (category: ICategory) => void;
  deleteHandler: (id: string) => void;
  number: number;
}

export const ListItem: FC<ListItemProps> = ({ category, editHandler, deleteHandler, number }) => {
  const { currentUser } = useAuth();

  return (
    <TableRow>
      <TableRowItem>{number}</TableRowItem>
      <TableRowItem>{category.title}</TableRowItem>
      <TableRowItemDescription>{category.description}</TableRowItemDescription>
      <TableRowItem>{category.productCount}</TableRowItem>
      <TableRowItem>{new Date(category.createdAt).toLocaleDateString()}</TableRowItem>
      <ActionButtons
        editHandler={() => editHandler(category)}
        deleteHandler={() => deleteHandler(category._id)}
        showEdit={currentUser?.permission.category.update}
        showDelete={currentUser?.permission.category.delete}
      />
    </TableRow>
  );
};
