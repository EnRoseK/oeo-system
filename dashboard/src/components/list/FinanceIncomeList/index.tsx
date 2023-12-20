import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IFinanceIncome } from '@/interfaces';
import { PAGE_SIZE } from '@/constants';
import { useCheckEmpty, useGetCurrentPage } from '@/hooks';
import { ResultNotFound } from '@/components/ui';

const TABLE_HEADS = ['#', 'Төрөл', 'Дүн', 'Шижилгээний дугаар', 'Үүссэн огноо'];

interface FinanceIncomeListProps {
  financeIncomes: IFinanceIncome[];
}

export const FinanceIncomeList: FC<FinanceIncomeListProps> = ({ financeIncomes }) => {
  const currentPage = useGetCurrentPage();
  const isEmpty = useCheckEmpty(financeIncomes.length);

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
              )}
              {isEmpty && <ResultNotFound />}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
