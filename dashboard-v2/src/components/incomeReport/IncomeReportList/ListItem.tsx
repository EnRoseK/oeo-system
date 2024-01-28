import { Table, TableBody, TableHead, TableHeadItem, TableRow, TableRowItem } from '@/components';
import { useAnimation } from '@/hooks';
import { IExpense, IProductExpense } from '@/interfaces';
import { convertDateToString } from '@/utils/convertDateToString';
import classNames from 'classnames';
import React, { FC, useState } from 'react';

const CHILD_TABLE_HEADS = ['Төрөл', 'Карт', 'Бэлэн мөнгө', 'Шилжүүлэг', 'Зээл', 'Нийт'];

interface ListItemProps {
  date: string;
  expenses: IExpense[];
  productExpenses: IProductExpense[];
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { date, expenses, productExpenses } = props;

  const [expand, setExpand] = useState<boolean>(false);
  const [renderExpand, onAnimationEnd] = useAnimation(expand);

  const totalExpense = expenses.reduce((acc, cur) => acc + cur.amount, 0);
  const totalIncomes = productExpenses.reduce((acc, cur) => acc + cur.totalPrice, 0);

  return (
    <>
      <TableRow onClick={() => setExpand((prev) => !prev)} className='cursor-pointer'>
        <TableRowItem>{convertDateToString(new Date(date))}</TableRowItem>
        <TableRowItem>{totalIncomes}₮</TableRowItem>
        <TableRowItem>{totalExpense}₮</TableRowItem>
        <TableRowItem>{totalIncomes - totalExpense}₮</TableRowItem>
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
                      <TableRow>
                        <TableRowItem>Орлого</TableRowItem>
                        <TableRowItem>
                          {productExpenses
                            .filter((expense) => expense.paymentType === 'CARD')
                            .reduce((acc, cur) => acc + cur.totalPrice, 0)}
                          ₮
                        </TableRowItem>
                        <TableRowItem>
                          {productExpenses
                            .filter((expense) => expense.paymentType === 'CASH')
                            .reduce((acc, cur) => acc + cur.totalPrice, 0)}
                          ₮
                        </TableRowItem>
                        <TableRowItem>
                          {productExpenses
                            .filter((expense) => expense.paymentType === 'TRANSFER')
                            .reduce((acc, cur) => acc + cur.totalPrice, 0)}
                          ₮
                        </TableRowItem>
                        <TableRowItem>
                          {productExpenses
                            .filter((expense) => expense.paymentType === 'RENT')
                            .reduce((acc, cur) => acc + cur.totalPrice, 0)}
                          ₮
                        </TableRowItem>
                        <TableRowItem>{totalIncomes}₮</TableRowItem>
                      </TableRow>

                      <TableRow>
                        <TableRowItem>Зарлага</TableRowItem>
                        <TableRowItem>
                          {expenses
                            .filter((expense) => expense.type === 'CARD')
                            .reduce((acc, cur) => acc + cur.amount, 0)}
                          ₮
                        </TableRowItem>
                        <TableRowItem>
                          {expenses
                            .filter((expense) => expense.type === 'CASH')
                            .reduce((acc, cur) => acc + cur.amount, 0)}
                          ₮
                        </TableRowItem>
                        <TableRowItem>
                          {expenses
                            .filter((expense) => expense.type === 'TRANSFER')
                            .reduce((acc, cur) => acc + cur.amount, 0)}
                          ₮
                        </TableRowItem>
                        <TableRowItem>
                          {expenses
                            .filter((expense) => expense.type === 'RENT')
                            .reduce((acc, cur) => acc + cur.amount, 0)}
                          ₮
                        </TableRowItem>
                        <TableRowItem>{totalExpense}₮</TableRowItem>
                      </TableRow>
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
