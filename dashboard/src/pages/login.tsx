import { ReactNode, useEffect } from 'react';
import { NextPageWithLayout } from './_app';
import { AuthLayout } from '@/layouts';
import { LoginForm } from '@/components/features';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      router.replace('/');
    }
  }, [currentUser]);

  return (
    <div className='flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900'>
      <h1 className='flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white'>
        <span>Онч Энх Онош</span>
      </h1>

      <LoginForm />
    </div>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page): ReactNode {
  return <AuthLayout>{page}</AuthLayout>;
};
