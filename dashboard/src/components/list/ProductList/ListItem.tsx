import { TableRow, TableRowItem, TableRowItemDescription } from '@/components/Table';
import { ActionButtons } from '@/components/ui';
import { IProduct } from '@/interfaces';
import React, { FC } from 'react';

interface ListItemProps {
  product: IProduct;
  number: number;
  editHandler: (product: IProduct) => void;
  deleteHandler: (id: string) => void;
}

export const ListItem: FC<ListItemProps> = ({ product, number, editHandler, deleteHandler }) => {
  return (
    <TableRow>
      <TableRowItem>{number}</TableRowItem>
      <TableRowItem>{product.title}</TableRowItem>
      <TableRowItem>{product.category.title}</TableRowItem>
      <TableRowItemDescription>{product.description}</TableRowItemDescription>
      <TableRowItem>{product.remainder.toLocaleString()}ш</TableRowItem>

      <ActionButtons editHandler={() => editHandler(product)} deleteHandler={() => deleteHandler(product?._id!)} />
    </TableRow>
  );
};
