import React, { FC } from 'react';
import { ListItem } from './ListItem';
import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { IProduct } from '@/interfaces';
import { useGetCurrentPage } from '@/hooks';
import { PAGE_SIZE } from '@/constants';

const TABLE_HEADS = ['#', 'Нэр', 'Ангилал', 'Тайлбар', 'Үлдэгдэл', 'Үйлдэл'];

interface ProductListProps {
  products: IProduct[];
  editHandler: (product: IProduct) => void;
  deleteHandler: (id: string) => void;
}

export const ProductList: FC<ProductListProps> = ({ products, editHandler, deleteHandler }) => {
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
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
