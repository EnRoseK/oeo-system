import { ResultNotFound, Table, TableBody, TableHead, TableHeadItem } from '@/components';
import { useCheckEmpty } from '@/hooks';
import { FC } from 'react';
import { ListItem } from './ListItem';

const TABLE_HEADS = ['Огноо', 'Нийт орлогын дүн', 'Нийт зарлагын дүн', 'Зөрүү'];

interface IncomeReportListProps {}

export const IncomeReportList: FC<IncomeReportListProps> = (props) => {
  const {} = props;

  const isEmpty = useCheckEmpty(15);

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
                  <ListItem />
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
