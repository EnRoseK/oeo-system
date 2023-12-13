import { TableRow, TableRowItem } from '@/components/Table';
import { ActionButtons } from '@/components/ui';
import { IProductIncome } from '@/interfaces';
import React, { FC } from 'react';

interface ListItemProps {
  number: number;
  productIncome: IProductIncome;
  deleteHandler: (id: string) => void;
}

export const ListItem: FC<ListItemProps> = ({ number, productIncome, deleteHandler }) => {
  return (
    <TableRow>
      <TableRowItem>{number}</TableRowItem>
      <TableRowItem>{productIncome.product.title}</TableRowItem>
      <TableRowItem>{productIncome.quantity.toLocaleString()}ш</TableRowItem>
      <TableRowItem>{productIncome.basePrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{productIncome.totalPrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{new Date(productIncome.createdAt).toLocaleDateString()}</TableRowItem>

      <ActionButtons showEdit={false} deleteHandler={() => deleteHandler(productIncome._id)} />
    </TableRow>
  );
};
