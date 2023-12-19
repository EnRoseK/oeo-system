import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IUser } from '@/interfaces/data/user';
import { useGetCurrentPage } from '@/hooks';
import { PAGE_SIZE } from '@/constants';

const TABLE_HEADS = ['#', 'Нэр', 'Овог', 'И-мэйл', 'Үүрэг', 'Үйлдэл'];

interface UserListProps {
  users: IUser[];
  editHandler: () => void;
  deleteHandler: () => void;
}

export const UserList: FC<UserListProps> = ({ users, editHandler, deleteHandler }) => {
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
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
