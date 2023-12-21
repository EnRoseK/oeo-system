import { getHomeStats } from '@/api/services';
import { IHomeStat } from '@/interfaces';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';

interface HomePageProps {
  homeStats: IHomeStat[];
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ req }) => {
  try {
    const res = await getHomeStats(req.cookies['connect.sid']);

    return {
      props: {
        homeStats: res.data,
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

const HomePage: NextPage<HomePageProps> = ({ homeStats }) => {
  return (
    <div className='px-4 pt-6'>
      <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4'>Хянах самбар</h1>
      <div className='grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3'>
        {homeStats.map((stat, index) => {
          return (
            <div
              key={index}
              className='items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800'
            >
              <div className='w-full'>
                <h3 className='text-base font-normal text-gray-500 dark:text-gray-400 mb-4'>{stat.title}</h3>
                <span className='text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white mb-4 block'>
                  {stat.stat.toLocaleString()}
                  {stat.isCurrency ? '₮' : 'ш'}
                </span>
                <p className='flex items-center text-base font-normal text-gray-500 dark:text-gray-400'>
                  {stat.differenceRate && (
                    <>
                      <span
                        className={`flex items-center mr-1.5 text-sm ${
                          stat.differenceRate > 0
                            ? 'text-green-500 dark:text-green-400'
                            : 'text-red-600 dark:text-red-500'
                        }`}
                      >
                        {stat.differenceRate > 0 ? (
                          <svg
                            className='w-4 h-4'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                          >
                            <path
                              clipRule='evenodd'
                              fillRule='evenodd'
                              d='M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z'
                            />
                          </svg>
                        ) : (
                          <svg
                            className='w-4 h-4'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                          >
                            <path
                              clipRule='evenodd'
                              fillRule='evenodd'
                              d='M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z'
                            />
                          </svg>
                        )}
                        {Math.round(stat.differenceRate).toLocaleString()}%
                      </span>
                      өмнөх сараас
                    </>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
