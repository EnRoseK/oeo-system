import { Table, TableBody, TableHead, TableHeadItem, TableRow, TableRowItem } from '@/components';
import { useAnimation } from '@/hooks';
import classNames from 'classnames';
import { FC, useState } from 'react';

const CHILD_TABLE_HEADS = ['Огноо', 'Эхний үлдэгдэл', 'Орлогодсон тоо', 'Зарлагадсан тоо', 'Эцсийн үлдэгдэл'];

export const ListItem: FC = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const [renderExpand, onAnimationEnd] = useAnimation(expand);

  return (
    <>
      <TableRow onClick={() => setExpand((prev) => !prev)} className='cursor-pointer'>
        <TableRowItem>ALAT</TableRowItem>
        <TableRowItem>ALAT</TableRowItem>
        <TableRowItem>ALAT</TableRowItem>
        <TableRowItem>ALAT</TableRowItem>
        <TableRowItem>ALAT</TableRowItem>
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
                      <TableRow>
                        <TableRowItem>Test</TableRowItem>
                        <TableRowItem>Test</TableRowItem>
                        <TableRowItem>Test</TableRowItem>
                      </TableRow>
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
