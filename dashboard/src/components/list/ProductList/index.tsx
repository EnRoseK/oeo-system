import React, { FC } from 'react';
import { ListItem } from './ListItem';
import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { IProduct } from '@/interfaces';
import { useCheckEmpty, useGetCurrentPage } from '@/hooks';
import { PAGE_SIZE } from '@/constants';
import { ResultNotFound } from '@/components/ui';

const TABLE_HEADS = ['#', 'Нэр', 'Ангилал', 'Тайлбар', 'Үлдэгдэл', 'Үйлдэл'];

interface ProductListProps {
  products: IProduct[];
  editHandler: (product: IProduct) => void;
  deleteHandler: (id: string) => void;
}

export const ProductList: FC<ProductListProps> = ({ products, editHandler, deleteHandler }) => {
  const currentPage = useGetCurrentPage();
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
                  {products.map((product, ind) => {
                    return (
                      <ListItem
                        product={product}
                        number={(currentPage - 1) * PAGE_SIZE + ind + 1}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                        key={product._id}
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
