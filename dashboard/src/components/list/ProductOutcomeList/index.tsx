import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IProductOutcome } from '@/interfaces';
import { PAGE_SIZE } from '@/constants';
import { useGetCurrentPage } from '@/hooks';

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
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
