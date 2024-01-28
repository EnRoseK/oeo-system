import { Table, TableBody, TableHead, TableHeadItem, ResultNotFound } from '@/components';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { IUser } from '@/interfaces';
import { useCheckEmpty } from '@/hooks';

const TABLE_HEADS = ['Дугаар', 'Нэр', 'Овог', 'И-мэйл', 'Үйлдэл'];

interface UsersListProps {
  users: IUser[];
  deleteHandler: (id: number) => void;
  editHandler: (user: IUser) => void;
}

export const UsersList: FC<UsersListProps> = (props) => {
  const { users, deleteHandler, editHandler } = props;

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
                  {users.map((user) => {
                    return (
                      <ListItem user={user} deleteHandler={deleteHandler} key={user.id} editHandler={editHandler} />
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
