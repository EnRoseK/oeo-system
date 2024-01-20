import { TableRow, TableRowItem, ActionButtons } from '@/components';
import { IProductExpense } from '@/interfaces';
import { FC } from 'react';

interface ListItemProps {
  productExpense: IProductExpense;
  deleteHandler: (id: number) => void;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { productExpense, deleteHandler } = props;

  return (
    <TableRow>
      <TableRowItem>{productExpense.id}</TableRowItem>
      <TableRowItem>{productExpense.product.title}</TableRowItem>
      <TableRowItem>{productExpense.quantity.toLocaleString()}ш</TableRowItem>
      <TableRowItem>{productExpense.basePrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>{productExpense.totalPrice.toLocaleString()}₮</TableRowItem>
      <TableRowItem>
        {productExpense.paymentType
          .replaceAll('CARD', 'Карт')
          .replaceAll('CASH', 'Бэлэн мөнгө')
          .replaceAll('TRANSFER', 'Шилжүүлэг')
          .replaceAll('RENT', 'Зээл')}
      </TableRowItem>
      <TableRowItem>{new Date(productExpense.createdAt).toLocaleDateString()}</TableRowItem>

      <ActionButtons showDelete deleteHandler={() => deleteHandler(productExpense.id)} showEdit={false} />
    </TableRow>
  );
};
