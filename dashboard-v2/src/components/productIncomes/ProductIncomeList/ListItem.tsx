import { TableRow, TableRowItem, ActionButtons } from '@/components';
import { IProductIncome } from '@/interfaces';
import { convertNumberToCurrency } from '@/utils';
import { FC } from 'react';

interface ListItemProps {
  productIncome: IProductIncome;
  deleteHandler: (id: number) => void;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { productIncome, deleteHandler } = props;

  return (
    <TableRow>
      <TableRowItem>{productIncome.id}</TableRowItem>
      <TableRowItem>{productIncome.product.title}</TableRowItem>
      <TableRowItem>{productIncome.quantity.toLocaleString()}ш</TableRowItem>
      <TableRowItem>{convertNumberToCurrency(productIncome.basePrice)}</TableRowItem>
      <TableRowItem>{convertNumberToCurrency(productIncome.totalPrice)}</TableRowItem>
      <TableRowItem>{new Date(productIncome.createdAt).toLocaleDateString()}</TableRowItem>

      <ActionButtons
        showEdit={false}
        deleteHandler={() => {
          deleteHandler(productIncome.id);
        }}
      />
    </TableRow>
  );
};
