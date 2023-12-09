import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
	children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
	return <main className='bg-gray-50 dark:bg-gray-900'>{children}</main>;
};
