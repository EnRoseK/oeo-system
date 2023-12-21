import { FC } from 'react';
import { SidebarItems } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  showMobileSidebar: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ showMobileSidebar }) => {
  const { pathname } = useRouter();
  const { currentUser } = useAuth();

  return (
    <AnimatePresence>
      <motion.aside
        className={`fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width`}
        animate={{ opacity: showMobileSidebar ? 1 : 0, left: showMobileSidebar ? 0 : -200 }}
      >
        <div className='relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex flex-col flex-1 pt-5 pb-4 overflow-y-auto'>
            <div className='flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
              <ul className='pb-2 space-y-2'>
                {SidebarItems.map((item, index) => {
                  const isActive = pathname === item.url;
                  const shouldShow = !item.permissionKey || currentUser?.permission[item.permissionKey].read;

                  if (shouldShow)
                    return (
                      <li key={index}>
                        <Link
                          href={item.url}
                          className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                            isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
                          }`}
                        >
                          <span
                            className={`text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white ${
                              isActive ? 'text-gray-900 dark:text-white' : ''
                            }`}
                          >
                            <item.icon size={24} />
                          </span>
                          <span className='ml-3'>{item.title}</span>
                        </Link>
                      </li>
                    );
                })}
              </ul>
            </div>
          </div>
        </div>
      </motion.aside>
      <motion.div
        className={`fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90 lg:hidden`}
        animate={{ opacity: showMobileSidebar ? 1 : 0 }}
      />
    </AnimatePresence>
  );
};
