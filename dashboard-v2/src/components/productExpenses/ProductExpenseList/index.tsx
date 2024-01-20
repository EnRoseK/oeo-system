import { Table, TableBody, TableHead, TableHeadItem, ResultNotFound } from '@/components';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { useCheckEmpty } from '@/hooks';
import { IProductExpense } from '@/interfaces';

const TABLE_HEADS = [
  'Дугаар',
  'Урвалжийн нэр',
  'Тоо ширхэг',
  'Нэгж үнэ',
  'Нийт үнэ',
  'Төлбөрийн төрөл',
  'Үүссэн огноо',
  'Үйлдэл',
];

interface ProductExpensesListProps {
  productExpenses: IProductExpense[];
  deleteHandler: (id: number) => void;
}

export const ProductExpensesList: FC<ProductExpensesListProps> = (props) => {
  const { productExpenses, deleteHandler } = props;

  const isEmpty = useCheckEmpty(productExpenses.length);

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
                  {productExpenses.map((productExpense) => {
                    return (
                      <ListItem productExpense={productExpense} deleteHandler={deleteHandler} key={productExpense.id} />
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
