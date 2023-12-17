import { TableRow, TableRowItem } from '@/components/Table';
import { ActionButtons } from '@/components/ui';
import { IProductOutcome } from '@/interfaces';
import React, { FC } from 'react';

interface ListItemProps {
  productOutcome: IProductOutcome;
  number: number;
  deleteHandler: (id: string) => void;
}

export const ListItem: FC<ListItemProps> = ({ productOutcome, number, deleteHandler }) => {
  return (
    <TableRow>
      <TableRowItem>{number}</TableRowItem>
      <TableRowItem>{productOutcome.product.title}</TableRowItem>
      <TableRowItem>{productOutcome.quantity.toLocaleString()}ш</TableRowItem>
      <TableRowItem>{productOutcome.basePrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{productOutcome.totalPrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{new Date(productOutcome.createdAt).toLocaleDateString()}</TableRowItem>

      <ActionButtons deleteHandler={() => deleteHandler(productOutcome._id)} showEdit={false} />
    </TableRow>
  );
};
