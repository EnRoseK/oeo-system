import { useAnimation, useCurrentUser } from '@/hooks';
import { ISidebarItem } from '@/interfaces';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

interface SidebarItemProps {
  item: ISidebarItem;
}

export const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { item } = props;
  const router = useRouter();
  const isActive = router.pathname === item.url;
  const { currentUser } = useCurrentUser();

  const [showChild, setShowChild] = useState<boolean>(
    item.child?.map((child) => child.url).includes(router.pathname) || false,
  );
  const [renderChild, onAnimationEnd] = useAnimation(showChild);

  useEffect(() => {
    if (item.child && !item.child.map((child) => child.url).includes(router.pathname)) {
      setShowChild(false);
    }
  }, [router.pathname, item.child]);

  const show = item.permissionKey ? item.permissionKey.filter((p) => currentUser?.permission[p]).length > 0 : true;

  if (show)
    return (
      <li>
        {!item.child ? (
          <Link
            href={item.url}
            className={classNames(
              'flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700',
              { 'bg-gray-100 dark:bg-gray-700': isActive },
            )}
          >
            <span
              className={classNames(
                'text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white',
                { 'text-gray-900 dark:text-white': isActive },
              )}
            >
              <item.icon size={24} />
            </span>
            <span className='ml-3'>{item.title}</span>
          </Link>
        ) : (
          <>
            <button
              type='button'
              className='flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
              onClick={() => setShowChild((prev) => !prev)}
            >
              <item.icon size={24} />
              <span className='flex-1 ml-3 text-left whitespace-nowrap'>{item.title}</span>
              <svg
                className={classNames('w-6 h-6', { '-rotate-90': showChild })}
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            {renderChild && (
              <div
                onAnimationEnd={onAnimationEnd}
                className={classNames('grid', {
                  'animate-collapseOpen': showChild,
                  'animate-collapseClose': !showChild,
                })}
              >
                <div className='overflow-hidden'>
                  <ul className='py-2 space-y-2'>
                    {item.child.map((child, index) => {
                      const isChildActive = child.url === router.pathname;
                      const showChild = child.permissionKey
                        ? child.permissionKey.filter((p) => currentUser?.permission[p]).length > 0
                        : true;

                      if (showChild)
                        return (
                          <li key={index}>
                            <Link
                              href={child.url}
                              className={classNames(
                                'flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700',
                                { 'bg-gray-100 dark:bg-gray-700': isChildActive },
                              )}
                            >
                              {child.title}
                            </Link>
                          </li>
                        );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </li>
    );
};
