import { TableRow, TableRowItem, ActionButtons } from '@/components';
import { IProductIncome } from '@/interfaces';
import React, { FC } from 'react';

interface ListItemProps {
  productIncome: IProductIncome;
  deleteHandler: (id: number) => void;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { productIncome, deleteHandler } = props;
  const today = new Date().toISOString();

  const startOfDay = today.split('T')[0] + 'T00:00:00.000Z';
  const endOfDay = today.split('T')[0] + 'T23:59:59.999Z';

  const isTodaysIncome = productIncome.createdAt <= endOfDay && productIncome.createdAt >= startOfDay;

  return (
    <TableRow>
      <TableRowItem>{productIncome.id}</TableRowItem>
      <TableRowItem>{productIncome.product.title}</TableRowItem>
      <TableRowItem>{productIncome.quantity.toLocaleString()}ш</TableRowItem>
      <TableRowItem>{productIncome.basePrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{productIncome.totalPrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{new Date(productIncome.createdAt).toLocaleDateString()}</TableRowItem>

      <ActionButtons
        showEdit={false}
        showDelete={isTodaysIncome}
        deleteHandler={() => {
          if (isTodaysIncome) {
            deleteHandler(productIncome.id);
          }
        }}
      />
    </TableRow>
  );
};
