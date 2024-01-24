import { Table, TableBody, TableHead, TableHeadItem } from '@/components';
import { FC } from 'react';
import { ListItem } from './ListItem';

const TABLE_HEADS = ['Урвалжийн нэр', 'Эхний үлдэгдэл', 'Орлогодсон тоо', 'Зарлагадсан тоо', 'Эцсийн үлдэгдэл'];

export const ProductReportList: FC = () => {
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
                <ListItem />
                <ListItem />
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
