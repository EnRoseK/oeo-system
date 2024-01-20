import React, { FC } from 'react';
import { ListItem } from './ListItem';
import { Table, TableBody, TableHead, TableHeadItem } from '@/components';
import { IExpense } from '@/interfaces';
import { ResultNotFound } from '@/components';
import { useCheckEmpty } from '@/hooks';

const TABLE_HEADS = ['Дугаар', 'Нэр', 'Тайлбар', 'Төрөл', 'Дүн', 'Үүссэн огноо', 'Үйлдэл'];

interface ExpenseListProps {
  expenses: IExpense[];
  editHandler: (expense: IExpense) => void;
  deleteHandler: (id: number) => void;
}

export const ExpenseList: FC<ExpenseListProps> = (props) => {
  const { expenses, editHandler, deleteHandler } = props;
  const isEmpty = useCheckEmpty(expenses.length);

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto'>
        <div className='inline-block min-w-full align-middle'>
          <div className='overflow-hidden shadow'>
            <Table>
              <TableHead>
                {TABLE_HEADS.map((head, index) => {
                  return <TableHeadItem key={index}>{head}</TableHeadItem>;
                })}
              </TableHead>
              {!isEmpty && (
                <TableBody>
                  {expenses.map((expense) => {
                    return (
                      <ListItem
                        expense={expense}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                        key={expense.id}
                      />
                    );
                  })}
                </TableBody>
              )}
              {isEmpty && <ResultNotFound />}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
