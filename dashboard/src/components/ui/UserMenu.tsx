import { UserMenuItems } from '@/constants';
import Link from 'next/link';
import { FC } from 'react';
import { motion } from '@/libs';
import { useAuth, useConfirm } from '@/hooks';
import { errorHandler } from '@/utils';
import { logout } from '@/api/services';
import { useRouter } from 'next/router';

export const UserMenu: FC = () => {
  const router = useRouter();
  const { currentUser, clearUser } = useAuth();
  const { isConfirmed } = useConfirm();

  const logoutHandler = async () => {
    try {
      const confirmed = await isConfirmed('Та системээс гарахдаа итгэлтэй байна уу?');
      if (!confirmed) return;
      await logout();
      clearUser();
      router.replace('/login');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <motion.div
      variants={{ initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
      initial='initial'
      animate='animate'
      exit='initial'
      transition={{ duration: 0.4, ease: 'anticipate' }}
      className='absolute top-14 right-2 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600'
    >
      <div className='px-4 py-3'>
        <p className='text-sm text-gray-900 dark:text-white'>
          {currentUser?.lastName} {currentUser?.firstName}
        </p>
        <p className='text-sm font-medium text-gray-900 truncate dark:text-gray-300'>{currentUser?.email}</p>
      </div>
      <ul className='py-1'>
        {UserMenuItems.map((item, index) => {
          return (
            <li key={index}>
              {item.title === 'Гарах' ? (
                <button
                  type='button'
                  onClick={logoutHandler}
                  className='w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  {item.title}
                </button>
              ) : (
                <Link
                  href={item.url}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};
