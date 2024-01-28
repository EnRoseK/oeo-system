import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = (props) => {
  const { children } = props;
  const { data } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data) {
      router.replace('/');
    } else {
      setIsLoading(false);
    }
  }, [data, router]);

  if (isLoading) {
    return <></>;
  }

  return <main className='bg-gray-50 dark:bg-gray-900'>{children}</main>;
};
