import { getFilteredUsers } from '@/api/services';
import { AddUserDrawer, EditUserDrawer } from '@/components/features';
import { UserList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm } from '@/hooks';
import { IPagination } from '@/interfaces';
import { IUser } from '@/interfaces/data/user';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

interface UsersPageProps {
  users: IUser[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async ({ query, req }) => {
  try {
    const { page = '1' } = query;

    const usersRes = await getFilteredUsers(Number(page), req.cookies['connect.sid']);

    return {
      props: {
        users: usersRes.data,
        pagination: usersRes.pagination,
      },
    };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          redirect: {
            destination: '/login',
            statusCode: 302,
          },
        };
      }

      if (error.response?.status === 403) {
        return {
          redirect: {
            destination: '/',
            statusCode: 302,
          },
        };
      }
    }

    return {
      notFound: true,
    };
  }
};

const UsersPage: NextPage<UsersPageProps> = ({ users, pagination }) => {
  const { isConfirmed } = useConfirm();
  const [drawerStates, setDrawerStates] = useState({
    add: false,
    edit: false,
  });

  const showDrawer = (drawer: 'add' | 'edit') => {
    setDrawerStates((prev) => ({ ...prev, [drawer]: true }));
  };

  const closeDrawer = (drawer: 'add' | 'edit') => {
    setDrawerStates((prev) => ({ ...prev, [drawer]: false }));
  };

  const deleteProduct = async () => {
    try {
      const confirmed = await isConfirmed('Та энэ урвалжийг устгахдаа итгэлтэй байна уу?');
    } catch (error) {}
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[{ title: translations.users, url: '/users' }]}
        title={translations.users}
        addBtnHandler={() => showDrawer('add')}
      />

      <UserList users={users} editHandler={() => showDrawer('edit')} deleteHandler={() => deleteProduct()} />
      <Pagination pagination={pagination} />

      <AddUserDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
      <EditUserDrawer show={drawerStates.edit} closeHandler={() => closeDrawer('edit')} />
    </>
  );
};

export default UsersPage;
