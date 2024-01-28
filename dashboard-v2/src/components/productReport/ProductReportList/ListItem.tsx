import { Table, TableBody, TableHead, TableHeadItem, TableRow, TableRowItem } from '@/components';
import { useAnimation } from '@/hooks';
import { IProduct, IProductExpense, IProductIncome } from '@/interfaces';
import { convertDateToString } from '@/utils/convertDateToString';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

const CHILD_TABLE_HEADS = ['Огноо', 'Эхний үлдэгдэл', 'Орлогодсон тоо', 'Зарлагадсан тоо', 'Эцсийн үлдэгдэл'];

interface ListItemProps {
  product: IProduct;
  productExpenses: IProductExpense[];
  productIncomes: IProductIncome[];
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { product, productExpenses, productIncomes } = props;
  const router = useRouter();
  const { startDate, endDate } = router.query;

  const [expand, setExpand] = useState<boolean>(false);
  const [renderExpand, onAnimationEnd] = useAnimation(expand);

  const currentProductExpenses = productExpenses.filter(
    (expense) => expense.createdAt.split('T')[0] >= startDate! && expense.createdAt.split('T')[0] <= endDate!,
  );
  const currentProductIncomes = productIncomes.filter(
    (income) => income.createdAt.split('T')[0] >= startDate! && income.createdAt.split('T')[0] <= endDate!,
  );

  const afterProductExpenses = productExpenses.filter((expense) => expense.createdAt.split('T')[0] > endDate!);
  const afterProductIncomes = productIncomes.filter((income) => income.createdAt.split('T')[0] > endDate!);

  const beforeAmount =
    product.balance -
    (afterProductIncomes.reduce((acc, cur) => acc + cur.quantity, 0) -
      afterProductExpenses.reduce((acc, cur) => acc + cur.quantity, 0)) -
    (currentProductIncomes.reduce((acc, cur) => acc + cur.quantity, 0) -
      currentProductExpenses.reduce((acc, cur) => acc + cur.quantity, 0));

  const afterAmount =
    beforeAmount +
    currentProductIncomes.reduce((acc, cur) => acc + cur.quantity, 0) -
    currentProductExpenses.reduce((acc, cur) => acc + cur.quantity, 0);

  const uniqueDates = Array.from(
    new Set([
      ...currentProductExpenses.map((expense) => expense.createdAt.split('T')[0]),
      ...currentProductIncomes.map((income) => income.createdAt.split('T')[0]),
    ]),
  );

  return (
    <>
      <TableRow onClick={() => setExpand((prev) => !prev)} className='cursor-pointer'>
        <TableRowItem>{product.title}</TableRowItem>
        <TableRowItem>{beforeAmount}ш</TableRowItem>
        <TableRowItem>{currentProductIncomes.reduce((acc, cur) => acc + cur.quantity, 0)}ш</TableRowItem>
        <TableRowItem>{currentProductExpenses.reduce((acc, cur) => acc + cur.quantity, 0)}ш</TableRowItem>
        <TableRowItem>{afterAmount}ш</TableRowItem>
      </TableRow>

      {renderExpand && (
        <tr>
          <td colSpan={5}>
            <div
              className={classNames('pointer-events-none grid', {
                'animate-collapseOpen': expand,
                'animate-collapseClose': !expand,
              })}
              onAnimationEnd={onAnimationEnd}
            >
              <div className='overflow-hidden'>
                <div className='p-4'>
                  <Table>
                    <TableHead>
                      {CHILD_TABLE_HEADS.map((head, index) => {
                        return <TableHeadItem key={index}>{head}</TableHeadItem>;
                      })}
                    </TableHead>
                    <TableBody>
                      {uniqueDates.map((date) => {
                        const currentIncomes = currentProductIncomes.filter(
                          (income) => income.createdAt.split('T')[0] === date,
                        );
                        const currentExpenses = currentProductExpenses.filter(
                          (expense) => expense.createdAt.split('T')[0] === date,
                        );

                        const beforeIncomes = currentProductIncomes.filter(
                          (income) => income.createdAt.split('T')[0] < date,
                        );
                        const beforeExpenses = currentProductExpenses.filter(
                          (expense) => expense.createdAt.split('T')[0] < date,
                        );

                        const beforeDateAmount =
                          beforeAmount +
                          beforeIncomes.reduce((acc, cur) => acc + cur.quantity, 0) -
                          beforeExpenses.reduce((acc, cur) => acc + cur.quantity, 0);

                        const afterDateAmount =
                          beforeDateAmount +
                          currentIncomes.reduce((acc, cur) => acc + cur.quantity, 0) -
                          currentExpenses.reduce((acc, cur) => acc + cur.quantity, 0);

                        return (
                          <TableRow key={date}>
                            <TableRowItem>{convertDateToString(new Date(date))}</TableRowItem>
                            <TableRowItem>{beforeDateAmount}ш</TableRowItem>
                            <TableRowItem>{currentIncomes.reduce((acc, cur) => acc + cur.quantity, 0)}ш</TableRowItem>
                            <TableRowItem>{currentExpenses.reduce((acc, cur) => acc + cur.quantity, 0)}ш</TableRowItem>
                            <TableRowItem>{afterDateAmount}ш</TableRowItem>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
