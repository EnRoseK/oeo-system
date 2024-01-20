import { TableRow, TableRowItem, ActionButtons } from '@/components';
import { IProductIncome } from '@/interfaces';
import React, { FC } from 'react';

interface ListItemProps {
  productIncome: IProductIncome;
  deleteHandler: (id: number) => void;
}

export const ListItem: FC<ListItemProps> = ({ productIncome, deleteHandler }) => {
  return (
    <TableRow>
      <TableRowItem>{productIncome.id}</TableRowItem>
      <TableRowItem>{productIncome.product.title}</TableRowItem>
      <TableRowItem>{productIncome.quantity.toLocaleString()}ш</TableRowItem>
      <TableRowItem>{productIncome.basePrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{productIncome.totalPrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{new Date(productIncome.createdAt).toLocaleDateString()}</TableRowItem>

      <ActionButtons showEdit={false} deleteHandler={() => deleteHandler(productIncome.id)} />
    </TableRow>
  );
};
