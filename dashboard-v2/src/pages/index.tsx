import { productExpenseServices, userServices } from '@/api/services';
import { siteName, translations } from '@/constants';
import { IProductExpense, IUser } from '@/interfaces';
import { convertDateToString } from '@/utils/convertDateToString';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';

interface DashboardProps {
  productExpenses: IProductExpense[];
  users: IUser[];
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (ctx) => {
  const { req } = ctx;

  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  const [productExpensesRes, usersRes] = await Promise.all([
    productExpenseServices.getProductExpenses({ pageSize: 5, jwt: session.jwt }),
    userServices.getUsers({ jwt: session.jwt }),
  ]);

  return {
    props: {
      productExpenses: productExpensesRes.data,
      users: usersRes,
    },
  };
};

const Dashboard: NextPage<DashboardProps> = (props) => {
  const { productExpenses, users } = props;

  const title = translations.dashboard + ' | ' + siteName;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className='px-4 pt-6'>
        <div className='grid gap-4 xl:grid-cols-2 2xl:grid-cols-3'>
          <div className='p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
            <h3 className='flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
              Сүүлд хийгдсэн шинжилгээнүүд
            </h3>

            <div className='border-t border-gray-200 dark:border-gray-600'>
              <div className='pt-4'>
                <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {productExpenses.map((expense) => {
                    return (
                      <li key={expense.id} className='py-3 sm:py-4'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center min-w-0'>
                            <div className='ml-3'>
                              <p className='font-medium text-gray-900 truncate dark:text-white'>
                                {expense.product.title}
                              </p>
                              <div className='flex items-center justify-end flex-1 text-sm text-gray-500'>
                                {convertDateToString(new Date(expense.createdAt))}
                              </div>
                            </div>
                          </div>
                          <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                            {expense.totalPrice}₮
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className='p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
            <h3 className='flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
              Сүүлд бүртгүүлсэн хэрэглэгчид
            </h3>

            <div className='border-t border-gray-200 dark:border-gray-600'>
              <div className='pt-4'>
                <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {users.slice(0, 5).map((user) => {
                    return (
                      <li key={user.id} className='py-3 sm:py-4'>
                        <div className='flex items-center space-x-4'>
                          <div className='flex-shrink-0'>
                            <Image
                              className='w-8 h-8 rounded-full'
                              src='/profile-female-icon.jpg'
                              alt={user.username}
                              width={32}
                              height={32}
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='font-medium text-gray-900 truncate dark:text-white'>
                              {user.lastName} {user.firstName}
                            </p>
                            <p className='text-sm text-gray-500 truncate dark:text-gray-400'>{user.email}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
