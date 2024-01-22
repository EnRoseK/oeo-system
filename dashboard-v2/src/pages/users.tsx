import { userServices } from '@/api/services';
import { PageHeader, UsersList } from '@/components';
import { translations } from '@/constants';
import { IUser, ServiceQuery } from '@/interfaces';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface UsersPageProps {
  users: IUser[];
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

  const [usersRes] = await Promise.all([userServices.getUsers(reqQuery)]);

  return {
    props: {
      users: usersRes,
    },
  };
};

const UsersPage: NextPage<UsersPageProps> = (props) => {
  const { users = [] } = props;

  // TODO: Add user create, edit drawer and delete handler
  return (
    <>
      <Head>
        <title>{translations.settings} | Онч Энх Онош</title>
      </Head>

      <PageHeader
        title={translations.users}
        breadcrumbItems={[{ title: translations.users, url: '/users' }]}
        showAddBtn
        addBtnHandler={() => undefined}
      />
      <UsersList users={users} deleteHandler={(id: number) => undefined} />
    </>
  );
};

export default UsersPage;
