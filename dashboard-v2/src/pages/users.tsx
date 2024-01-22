import { userServices } from '@/api/services';
import { AddUser, EditUser, PageHeader, UsersList } from '@/components';
import { translations } from '@/constants';
import { useConfirm, useDrawer, useRefreshData } from '@/hooks';
import { IRole, IUser, ServiceQuery } from '@/interfaces';
import { errorHandler } from '@/utils';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { toast } from 'react-toastify';

interface UsersPageProps {
  users: IUser[];
  roles: IRole[];
}

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async (ctx) => {
  const { query } = ctx;
  const { search } = query;
  const reqQuery: ServiceQuery = {
    filters: {},
  };

  if (search) {
    reqQuery.filters = {
      $or: [
        { firstName: { $contains: search } },
        { lastName: { $contains: search } },
        { email: { $contains: search } },
      ],
    };
  }

  const [usersRes, rolesRes] = await Promise.all([userServices.getUsers(reqQuery), userServices.getRoles()]);

  return {
    props: {
      users: usersRes,
      roles: rolesRes.roles,
    },
  };
};

const UsersPage: NextPage<UsersPageProps> = (props) => {
  const { users = [], roles = [] } = props;
  const [openDrawer, closeDrawer] = useDrawer();
  const { isConfirmed } = useConfirm();
  const refreshData = useRefreshData();

  const openAddDrawer = () => {
    openDrawer(<AddUser closeHandler={closeDrawer} roles={roles} />);
  };

  const openEditDrawer = (user: IUser) => {
    openDrawer(<EditUser closeHandler={closeDrawer} user={user} roles={roles} />);
  };

  const deleteHandler = async (id: number) => {
    try {
      const confirmed = await isConfirmed('Та энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?');
      if (!confirmed) return;

      await userServices.deleteUser(id);

      toast.warning('Хэрэглэгчийг амжилттай устгалаа');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <Head>
        <title>{translations.users} | Онч Энх Онош</title>
      </Head>

      <PageHeader
        title={translations.users}
        breadcrumbItems={[{ title: translations.users, url: '/users' }]}
        showAddBtn
        addBtnHandler={openAddDrawer}
      />
      <UsersList users={users} deleteHandler={deleteHandler} editHandler={openEditDrawer} />
    </>
  );
};

export default UsersPage;
