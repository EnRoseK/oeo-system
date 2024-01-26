import { ResultNotFound, Table, TableBody, TableHead, TableHeadItem } from '@/components';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IProductReport } from '@/interfaces';
import { useCheckEmpty } from '@/hooks';

const TABLE_HEADS = ['Урвалжийн нэр', 'Эхний үлдэгдэл', 'Орлогодсон тоо', 'Зарлагадсан тоо', 'Эцсийн үлдэгдэл'];

interface ProductReportListProps {
  productReports: IProductReport[];
}

export const ProductReportList: FC<ProductReportListProps> = (props) => {
  const { productReports } = props;

  const isEmpty = useCheckEmpty(productReports.length);
  const uniqueProductIds = Array.from(new Set(productReports.map((report) => report.product.id)));

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
                  {uniqueProductIds.map((id) => {
                    return <ListItem key={id} productId={id} productReports={productReports} />;
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
