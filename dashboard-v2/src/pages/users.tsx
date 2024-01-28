import { userServices } from '@/api/services';
import { AddUser, EditUser, PageHeader, UsersList } from '@/components';
import { siteName, translations } from '@/constants';
import { useCheckPermission, useConfirm, useDrawer, useRefreshData } from '@/hooks';
import { IUser, ServiceQuery } from '@/interfaces';
import { errorHandler } from '@/utils';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { toast } from 'react-toastify';

interface UsersPageProps {
  users: IUser[];
}

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async (ctx) => {
  const { query, req } = ctx;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  const { search } = query;
  const reqQuery: ServiceQuery = {
    filters: {},
    jwt: session.jwt,
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

  const [usersRes] = await Promise.all([userServices.getUsers(reqQuery)]);

  return {
    props: {
      users: usersRes,
    },
  };
};

const UsersPage: NextPage<UsersPageProps> = (props) => {
  const title = `${translations.users} | ${siteName}`;

  const { users = [] } = props;
  useCheckPermission('user');

  const [openDrawer, closeDrawer] = useDrawer();
  const { isConfirmed } = useConfirm();
  const refreshData = useRefreshData();
  const { data: session } = useSession();

  const openAddDrawer = () => {
    openDrawer(<AddUser closeHandler={closeDrawer} />);
  };

  const openEditDrawer = (user: IUser) => {
    openDrawer(<EditUser closeHandler={closeDrawer} user={user} />);
  };

  const deleteHandler = async (id: number) => {
    try {
      const confirmed = await isConfirmed('Та энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?');
      if (!confirmed) return;

      await userServices.deleteUser(id, session?.jwt!);

      toast.warning('Хэрэглэгчийг амжилттай устгалаа');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
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
