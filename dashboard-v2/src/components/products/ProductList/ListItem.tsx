import { TableRow, TableRowItem, TableRowItemDescription, ActionButtons } from '@/components';
import { IProduct } from '@/interfaces';
import { FC } from 'react';

interface ListItemProps {
  product: IProduct;
  editHandler: (product: IProduct) => void;
  deleteHandler: (id: number) => void;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { product, editHandler, deleteHandler } = props;

  return (
    <TableRow>
      <TableRowItem>{product.id}</TableRowItem>
      <TableRowItem>{product.title}</TableRowItem>
      <TableRowItem>{product.product_category.title}</TableRowItem>
      <TableRowItemDescription>{product.description}</TableRowItemDescription>
      <TableRowItem>{product.balance.toLocaleString()}ш</TableRowItem>

      <ActionButtons
        editHandler={() => editHandler(product)}
        deleteHandler={() => deleteHandler(product.id!)}
        showEdit
        showDelete
      />
    </TableRow>
  );
};
