import React, { FC } from 'react';
import { ListItem } from './ListItem';
import { Table, TableBody, TableHead, TableHeadItem } from '@/components';
import { ICategory } from '@/interfaces';
import { ResultNotFound } from '@/components';
import { useCheckEmpty } from '@/hooks';

const TABLE_HEADS = ['Дугаар', 'Нэр', 'Тайлбар', 'Урвалжийн тоо', 'Үүссэн огноо', 'Үйлдэл'];

interface CategoryListProps {
  categories: ICategory[];
  editHandler: (category: ICategory) => void;
  deleteHandler: (id: number) => void;
}

export const CategoryList: FC<CategoryListProps> = (props) => {
  const { categories, editHandler, deleteHandler } = props;
  const isEmpty = useCheckEmpty(categories.length);

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
                  {categories.map((category, index) => {
                    return (
                      <ListItem
                        category={category}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                        key={category.id}
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
