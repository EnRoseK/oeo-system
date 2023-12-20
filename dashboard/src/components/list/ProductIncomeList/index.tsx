import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IProductIncome } from '@/interfaces';
import { PAGE_SIZE } from '@/constants';
import { useCheckEmpty, useGetCurrentPage } from '@/hooks';
import { ResultNotFound } from '@/components/ui';

const TABLE_HEADS = [
  '#',
  'Урвалж орлогын дугаар',
  'Урвалжийн нэр',
  'Тоо ширхэг',
  'Нэгж үнэ',
  'Нийт үнэ',
  'Үүссэн огноо',
  'Үйлдэл',
];

interface ProductIncomeListProps {
  productIncomes: IProductIncome[];
  deleteHandler: (id: string) => void;
}

export const ProductIncomeList: FC<ProductIncomeListProps> = ({ productIncomes, deleteHandler }) => {
  const currentPage = useGetCurrentPage();
  const isEmpty = useCheckEmpty(productIncomes.length);

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
                  {productIncomes.map((productIncome, ind) => {
                    return (
                      <ListItem
                        number={(currentPage - 1) * PAGE_SIZE + ind + 1}
                        productIncome={productIncome}
                        deleteHandler={deleteHandler}
                        key={productIncome._id}
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
