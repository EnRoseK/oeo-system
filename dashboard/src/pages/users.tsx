import { getFilteredUsers, removeUser } from '@/api/services';
import { AddUserDrawer, EditUserDrawer } from '@/components/features';
import { UserList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useAuth, useConfirm, useRefreshData } from '@/hooks';
import { IPagination } from '@/interfaces';
import { IUser } from '@/interfaces/data/user';
import { errorHandler } from '@/utils';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface UsersPageProps {
  users: IUser[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async ({ query, req }) => {
  try {
    const { page = '1', search = '' } = query;

    const usersRes = await getFilteredUsers(Number(page), search as string, req.cookies['connect.sid']);

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
  const { currentUser } = useAuth();
  const refreshData = useRefreshData();
  const { isConfirmed } = useConfirm();
  const [drawerStates, setDrawerStates] = useState({
    add: false,
    edit: false,
  });
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);

  const showDrawer = (drawer: 'add' | 'edit') => {
    setDrawerStates((prev) => ({ ...prev, [drawer]: true }));
  };

  const closeDrawer = (drawer: 'add' | 'edit') => {
    setDrawerStates((prev) => ({ ...prev, [drawer]: false }));
  };

  const deleteUser = async (id: string) => {
    if (!currentUser?.permission.users.delete) return;
    try {
      const confirmed = await isConfirmed('Та энэ урвалжийг устгахдаа итгэлтэй байна уу?');
      if (!confirmed) return;

      await removeUser(id);

      refreshData();
      toast.success('Хэрэглэгч амжилттай устлаа');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[{ title: translations.users, url: '/users' }]}
        title={translations.users}
        addBtnHandler={() => showDrawer('add')}
        showAddBtn={currentUser?.permission.users.create}
      />

      <UserList
        users={users}
        editHandler={(user: IUser) => {
          showDrawer('edit');
          setSelectedUser(user);
        }}
        deleteHandler={(id: string) => deleteUser(id)}
      />
      <Pagination pagination={pagination} />

      {currentUser?.permission.users.create && (
        <AddUserDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
      )}
      {currentUser?.permission.users.update && (
        <EditUserDrawer show={drawerStates.edit} closeHandler={() => closeDrawer('edit')} user={selectedUser!} />
      )}
    </>
  );
};

export default UsersPage;
