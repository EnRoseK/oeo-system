import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IProductIncome } from '@/interfaces';
import { PAGE_SIZE } from '@/constants';
import { useGetCurrentPage } from '@/hooks';

const TABLE_HEADS = ['#', 'Урвалжийн нэр', 'Тоо ширхэг', 'Нэгж үнэ', 'Нийт үнэ', 'Үүссэн огноо', 'Үйлдэл'];

interface ProductIncomeListProps {
  productIncomes: IProductIncome[];
  deleteHandler: (id: string) => void;
}

export const ProductIncomeList: FC<ProductIncomeListProps> = ({ productIncomes, deleteHandler }) => {
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
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
