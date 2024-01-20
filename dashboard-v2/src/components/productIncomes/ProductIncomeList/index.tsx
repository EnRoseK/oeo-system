import { Table, TableBody, TableHead, TableHeadItem, ResultNotFound } from '@/components';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IProductIncome } from '@/interfaces';
import { useCheckEmpty } from '@/hooks';

const TABLE_HEADS = ['Дугаар', 'Урвалжийн нэр', 'Тоо ширхэг', 'Нэгж үнэ', 'Нийт үнэ', 'Үүссэн огноо', 'Үйлдэл'];

interface ProductIncomeListProps {
  productIncomes: IProductIncome[];
  deleteHandler: (id: number) => void;
}

export const ProductIncomeList: FC<ProductIncomeListProps> = ({ productIncomes, deleteHandler }) => {
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
                  {productIncomes.map((productIncome) => {
                    return (
                      <ListItem productIncome={productIncome} deleteHandler={deleteHandler} key={productIncome.id} />
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
