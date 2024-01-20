import { FC } from 'react';
import { ListItem } from './ListItem';
import { Table, TableBody, TableHead, TableHeadItem, ResultNotFound } from '@/components';
import { IProduct } from '@/interfaces';
import { useCheckEmpty } from '@/hooks';

const TABLE_HEADS = ['Дугаар', 'Нэр', 'Ангилал', 'Тайлбар', 'Үлдэгдэл', 'Үйлдэл'];

interface ProductListProps {
  products: IProduct[];
  editHandler: (product: IProduct) => void;
  deleteHandler: (id: number) => void;
}

export const ProductList: FC<ProductListProps> = (props) => {
  const { products, editHandler, deleteHandler } = props;
  const isEmpty = useCheckEmpty(products.length);

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
                  {products.map((product) => {
                    return (
                      <ListItem
                        product={product}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                        key={product.id}
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
