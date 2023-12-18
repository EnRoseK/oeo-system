import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IFinanceExpense } from '@/interfaces';
import { PAGE_SIZE } from '@/constants';
import { useGetCurrentPage } from '@/hooks';

const TABLE_HEADS = ['#', 'Төрөл', 'Дүн', 'Тайлбар', 'Урвалж орлогын дугаар', 'Үүссэн огноо', 'Үйлдэл'];

interface FinanceExpenseListProps {
  financeExpesnes: IFinanceExpense[];
  deleteHandler: (id: string) => void;
}

export const FinanceExpenseList: FC<FinanceExpenseListProps> = ({ financeExpesnes, deleteHandler }) => {
  const currentPage = useGetCurrentPage();

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
              <TableBody>
                {financeExpesnes.map((financeExpense, ind) => {
                  return (
                    <ListItem
                      number={(currentPage - 1) * PAGE_SIZE + ind + 1}
                      financeExpense={financeExpense}
                      deleteHandler={deleteHandler}
                      key={financeExpense._id}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
