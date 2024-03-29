import { AuthLayout } from '@/layouts';
import { NextPageWithLayout } from './_app';
import { ReactNode } from 'react';
import { LoginForm } from '@/components';
import Head from 'next/head';
import { siteName, translations } from '@/constants';

const LoginPage: NextPageWithLayout = () => {
  const title = `${translations.login} | ${siteName}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className='flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900'>
        <h1 className='flex items-center justify-center mb-8 text-3xl font-semibold lg:mb-10 dark:text-white'>
          <span>Онч Энх Онош</span>
        </h1>

        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page): ReactNode {
  return <AuthLayout>{page}</AuthLayout>;
};
