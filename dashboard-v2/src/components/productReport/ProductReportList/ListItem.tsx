import { Table, TableBody, TableHead, TableHeadItem, TableRow, TableRowItem } from '@/components';
import { useAnimation } from '@/hooks';
import { IProductReport } from '@/interfaces';
import { convertDateToString } from '@/utils/convertDateToString';
import classNames from 'classnames';
import { FC, useState } from 'react';

const CHILD_TABLE_HEADS = ['Огноо', 'Эхний үлдэгдэл', 'Орлогодсон тоо', 'Зарлагадсан тоо', 'Эцсийн үлдэгдэл'];

interface ListItemProps {
  productId: number;
  productReports: IProductReport[];
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { productId, productReports } = props;
  const currentProductReports = productReports.filter((report) => report.product.id === productId);
  const currentProduct = currentProductReports?.[0].product;

  const beforeAmount = currentProductReports.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1))[0]
    .before;
  const afterAmount = currentProductReports.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1))[0]
    .after;

  const [expand, setExpand] = useState<boolean>(false);
  const [renderExpand, onAnimationEnd] = useAnimation(expand);

  return (
    <>
      <TableRow onClick={() => setExpand((prev) => !prev)} className='cursor-pointer'>
        <TableRowItem>{currentProduct.title}</TableRowItem>
        <TableRowItem>{beforeAmount.toLocaleString()}ш</TableRowItem>
        <TableRowItem>
          {currentProductReports.reduce((acc, cur) => acc + cur.incomeAmount, 0).toLocaleString()}ш
        </TableRowItem>
        <TableRowItem>
          {currentProductReports.reduce((acc, cur) => acc + cur.expenseAmount, 0).toLocaleString()}ш
        </TableRowItem>
        <TableRowItem>{afterAmount.toLocaleString()}ш</TableRowItem>
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
                      {currentProductReports.map((report) => {
                        return (
                          <TableRow key={report.id}>
                            <TableRowItem>{convertDateToString(new Date(report.createdAt))}</TableRowItem>
                            <TableRowItem>{report.before.toLocaleString()}ш</TableRowItem>
                            <TableRowItem>{report.incomeAmount.toLocaleString()}ш</TableRowItem>
                            <TableRowItem>{report.expenseAmount.toLocaleString()}ш</TableRowItem>
                            <TableRowItem>{report.after.toLocaleString()}ш</TableRowItem>
                          </TableRow>
                        );
                      })}
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
