import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IProductOutcome } from '@/interfaces';
import { PAGE_SIZE } from '@/constants';
import { useCheckEmpty, useGetCurrentPage } from '@/hooks';
import { ResultNotFound } from '@/components/ui';

const TABLE_HEADS = [
  '#',
  'Шинжилгээний дугаар',
  'Урвалжийн нэр',
  'Тоо ширхэг',
  'Нэгж үнэ',
  'Нийт үнэ',
  'Үүссэн огноо',
  'Үйлдэл',
];

interface ProductOutcomesListProps {
  productOutcomes: IProductOutcome[];

  deleteHandler: (id: string) => void;
}

export const ProductOutcomesList: FC<ProductOutcomesListProps> = ({ productOutcomes, deleteHandler }) => {
  const currentPage = useGetCurrentPage();
  const isEmpty = useCheckEmpty(productOutcomes.length);

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
                  {productOutcomes.map((productOutcome, ind) => {
                    return (
                      <ListItem
                        productOutcome={productOutcome}
                        number={(currentPage - 1) * PAGE_SIZE + ind + 1}
                        deleteHandler={deleteHandler}
                        key={productOutcome._id}
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
