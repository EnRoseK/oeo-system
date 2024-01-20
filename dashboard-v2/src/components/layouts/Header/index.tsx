import { useAnimation, useClickOutside } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';
import { UserMenu } from './UserMenu';
import { ThemeSwitcher } from './ThemeSwitcher';
import { CloseIcon, MobileMenuIcon } from '@/assets/icons';

interface HeaderProps {
  showMobileSidebar: boolean;
  setShowMobileSidebar: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<HeaderProps> = (props) => {
  const { showMobileSidebar, setShowMobileSidebar } = props;
  const [showUserMenu, setShowUserMenu, userMenuRef] = useClickOutside();
  const [renderUserMenu, onAnimationEnd] = useAnimation(showUserMenu);

  return (
    <nav className='fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start'>
            <button
              onClick={() => setShowMobileSidebar((prev) => !prev)}
              className='p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              {showMobileSidebar ? <CloseIcon /> : <MobileMenuIcon />}
            </button>
            <Link href='/' className='flex ml-2 md:mr-24'>
              <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                Онч Энх Онош
              </span>
            </Link>
          </div>
          <div className='flex items-center'>
            <ThemeSwitcher />

            <div ref={userMenuRef} className='flex items-center ml-3'>
              <div>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  type='button'
                  className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                >
                  <Image
                    className='w-8 h-8 rounded-full'
                    src='/profile-female-icon.jpg'
                    alt={'Javkhlant'}
                    width={32}
                    height={32}
                    priority
                  />
                </button>
              </div>
              {renderUserMenu && <UserMenu show={showUserMenu} onAnimationEnd={onAnimationEnd} />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
