import { TableRow, TableRowItem } from '@/components/Table';
import { ActionButtons } from '@/components/ui';
import { useAuth } from '@/hooks';
import { IProductIncome } from '@/interfaces';
import React, { FC } from 'react';

interface ListItemProps {
  number: number;
  productIncome: IProductIncome;
  deleteHandler: (id: string) => void;
}

export const ListItem: FC<ListItemProps> = ({ number, productIncome, deleteHandler }) => {
  const { currentUser } = useAuth();

  return (
    <TableRow>
      <TableRowItem>{number}</TableRowItem>
      <TableRowItem>{productIncome.productIncomeId}</TableRowItem>
      <TableRowItem>{productIncome.product.title}</TableRowItem>
      <TableRowItem>{productIncome.quantity.toLocaleString()}ш</TableRowItem>
      <TableRowItem>{productIncome.basePrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{productIncome.totalPrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{new Date(productIncome.createdAt).toLocaleDateString()}</TableRowItem>

      <ActionButtons
        showEdit={false}
        showDelete={currentUser?.permission.productIncome.update}
        deleteHandler={() => deleteHandler(productIncome._id)}
      />
    </TableRow>
  );
};
