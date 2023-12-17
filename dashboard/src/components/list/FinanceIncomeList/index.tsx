import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IFinanceIncome } from '@/interfaces';
import { PAGE_SIZE } from '@/constants';
import { useGetCurrentPage } from '@/hooks';

const TABLE_HEADS = ['#', 'Төрөл', 'Дүн', 'Үүссэн огноо'];

interface FinanceIncomeListProps {
  financeIncomes: IFinanceIncome[];
}

export const FinanceIncomeList: FC<FinanceIncomeListProps> = ({ financeIncomes }) => {
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
                {financeIncomes.map((financeIncome, ind) => {
                  return (
                    <ListItem
                      key={financeIncome._id}
                      number={(currentPage - 1) * PAGE_SIZE + ind + 1}
                      financeIncome={financeIncome}
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
