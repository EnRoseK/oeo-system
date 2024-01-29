import { TableRow, TableRowItem, ActionButtons } from '@/components';
import { IProductExpense } from '@/interfaces';
import { convertNumberToCurrency } from '@/utils';
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
      <TableRowItem>{convertNumberToCurrency(productExpense.basePrice)}</TableRowItem>
      <TableRowItem>{convertNumberToCurrency(productExpense.totalPrice)}</TableRowItem>
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
