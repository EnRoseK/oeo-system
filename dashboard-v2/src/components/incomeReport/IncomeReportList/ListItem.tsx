import { Table, TableBody, TableHead, TableHeadItem, TableRow, TableRowItem } from '@/components';
import { useAnimation } from '@/hooks';
import classNames from 'classnames';
import React, { FC, useState } from 'react';

const CHILD_TABLE_HEADS = ['Төрөл', 'Карт', 'Бэлэн мөнгө', 'Шилжүүлэг', 'Зээл', 'Нийт'];

export const ListItem: FC = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const [renderExpand, onAnimationEnd] = useAnimation(expand);

  return (
    <>
      <TableRow onClick={() => setExpand((prev) => !prev)} className='cursor-pointer'>
        <TableRowItem>2020/03/11</TableRowItem>
        <TableRowItem>1000</TableRowItem>
        <TableRowItem>1000</TableRowItem>
        <TableRowItem>1000</TableRowItem>
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
                        <TableRowItem>Орлого</TableRowItem>
                        <TableRowItem>1500</TableRowItem>
                        <TableRowItem>1500</TableRowItem>
                        <TableRowItem>1500</TableRowItem>
                        <TableRowItem>1500</TableRowItem>
                        <TableRowItem>1500</TableRowItem>
                      </TableRow>

                      <TableRow>
                        <TableRowItem>Зарлага</TableRowItem>
                        <TableRowItem>1500</TableRowItem>
                        <TableRowItem>1500</TableRowItem>
                        <TableRowItem>1500</TableRowItem>
                        <TableRowItem>1500</TableRowItem>
                        <TableRowItem>1500</TableRowItem>
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
