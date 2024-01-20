import { UserMenuItems } from '@/constants';
import Link from 'next/link';
import React, { FC } from 'react';
import classNames from 'classnames';

interface UserMenuProps {
  show: boolean;
  onAnimationEnd: () => void;
}

export const UserMenu: FC<UserMenuProps> = (props) => {
  const { show, onAnimationEnd } = props;

  return (
    <div
      onAnimationEnd={onAnimationEnd}
      className={classNames(
        'absolute top-14 right-2 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600',
        {
          'animate-userMenuOpen': show,
          'animate-userMenuClose': !show,
        },
      )}
    >
      <div className='px-4 py-3'>
        <p className='text-sm text-gray-900 dark:text-white'>Javkhlant Altankhuyag</p>
        <p className='text-sm font-medium text-gray-900 truncate dark:text-gray-300'>enrosek95@gmail.com</p>
      </div>
      <ul className='py-1'>
        {UserMenuItems.map((item, index) => {
          return (
            <li key={index}>
              {item.title === 'Гарах' ? (
                <button
                  type='button'
                  // onClick={logoutHandler}
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
    </div>
  );
};
