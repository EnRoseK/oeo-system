import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = (props) => {
  const { children } = props;

  return <main className='bg-gray-50 dark:bg-gray-900'>{children}</main>;
};
