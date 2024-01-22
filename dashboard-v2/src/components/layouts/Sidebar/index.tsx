import { SidebarItems } from '@/constants';
import classNames from 'classnames';
import { FC } from 'react';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {
  show: boolean;
  onAnimationEnd: () => void;
  closeHandler: () => void;
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { show, onAnimationEnd, closeHandler } = props;

  return (
    <>
      <aside
        onAnimationEnd={onAnimationEnd}
        className={classNames(
          'fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width',
          { 'animate-sidebarOpen': show, 'animate-sidebarClose pointer-events-none': !show },
        )}
      >
        <div className='relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex flex-col flex-1 pt-5 pb-4 overflow-y-auto'>
            <div className='flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
              <ul className='pb-2 space-y-2'>
                {SidebarItems.map((item, index) => {
                  return <SidebarItem key={index} item={item} />;
                })}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <div
        onClick={closeHandler}
        onAnimationEnd={onAnimationEnd}
        className={classNames('fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90 lg:hidden', {
          'animate-fadeIn': show,
          'animate-fadeOut': !show,
        })}
      />
    </>
  );
};
