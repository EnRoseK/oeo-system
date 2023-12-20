import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IUser } from '@/interfaces/data/user';
import { useCheckEmpty, useGetCurrentPage } from '@/hooks';
import { PAGE_SIZE } from '@/constants';
import { ResultNotFound } from '@/components/ui';

const TABLE_HEADS = ['#', 'Нэр', 'Овог', 'И-мэйл', 'Үйлдэл'];

interface UserListProps {
  users: IUser[];
  editHandler: (user: IUser) => void;
  deleteHandler: (id: string) => void;
}

export const UserList: FC<UserListProps> = ({ users, editHandler, deleteHandler }) => {
  const currentPage = useGetCurrentPage();
  const isEmpty = useCheckEmpty(users.length);

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
                  {users.map((user, ind) => {
                    return (
                      <ListItem
                        user={user}
                        number={(currentPage - 1) * PAGE_SIZE + ind + 1}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                        key={user._id}
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
