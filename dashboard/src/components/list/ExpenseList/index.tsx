import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { ResultNotFound } from '@/components/ui';
import { useCheckEmpty, useGetCurrentPage } from '@/hooks';
import { IExpense } from '@/interfaces';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { PAGE_SIZE } from '@/constants';

const TABLE_HEADS = ['#', 'Зарлагын дугаар', 'Гарчиг', 'Тайлбар', 'Төрөл', 'Үнэ', 'Үүссэн огноо', 'Үйлдэл'];

interface ExpenseListProps {
  expenses: IExpense[];
  deleteHandler: (id: string) => void;
}

export const ExpenseList: FC<ExpenseListProps> = ({ expenses, deleteHandler }) => {
  const currentPage = useGetCurrentPage();
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
                  {expenses.map((expense, ind) => {
                    return (
                      <ListItem
                        expense={expense}
                        number={(currentPage - 1) * PAGE_SIZE + ind + 1}
                        deleteHandler={deleteHandler}
                        key={expense._id}
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
