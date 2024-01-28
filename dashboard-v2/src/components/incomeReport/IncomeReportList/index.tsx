import { ResultNotFound, Table, TableBody, TableHead, TableHeadItem } from '@/components';
import { useCheckEmpty } from '@/hooks';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IExpense, IProductExpense } from '@/interfaces';

const TABLE_HEADS = ['Огноо', 'Нийт орлогын дүн', 'Нийт зарлагын дүн', 'Зөрүү'];

interface IncomeReportListProps {
  uniqueDates: string[];
  expenses: IExpense[];
  productExpenses: IProductExpense[];
}

export const IncomeReportList: FC<IncomeReportListProps> = (props) => {
  const { uniqueDates, expenses, productExpenses } = props;

  const isEmpty = useCheckEmpty(uniqueDates.length);

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
                  {uniqueDates
                    .sort((a, b) => (new Date(a) > new Date(b) ? -1 : 1))
                    .map((date) => {
                      return (
                        <ListItem
                          key={date}
                          date={date}
                          expenses={expenses.filter((expense) => expense.createdAt.split('T')[0] === date)}
                          productExpenses={productExpenses.filter(
                            (expense) => expense.createdAt.split('T')[0] === date,
                          )}
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
