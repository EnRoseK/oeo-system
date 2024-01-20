import { TableRow, TableRowItem, TableRowItemDescription, ActionButtons } from '@/components';
import { ICategory } from '@/interfaces';
import { convertDateToString } from '@/utils/convertDateToString';
import { FC } from 'react';

interface ListItemProps {
  category: ICategory;
  editHandler: (category: ICategory) => void;
  deleteHandler: (id: number) => void;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { category, editHandler, deleteHandler } = props;

  return (
    <TableRow>
      <TableRowItem>{category.id}</TableRowItem>
      <TableRowItem>{category.title}</TableRowItem>
      <TableRowItemDescription>{category.description}</TableRowItemDescription>
      <TableRowItem>{category.productCount}</TableRowItem>
      <TableRowItem>{convertDateToString(new Date(category.createdAt))}</TableRowItem>
      <ActionButtons
        editHandler={() => editHandler(category)}
        deleteHandler={() => deleteHandler(category.id)}
        showEdit
        showDelete
      />
    </TableRow>
  );
};
