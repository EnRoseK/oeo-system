import { Dispatch, FC, SetStateAction } from 'react';
import Link from 'next/link';
import { UserMenu } from './UserMenu';
import { Icons, AnimatePresence } from '@/libs';
import { CloseIcon, MobileMenuIcon } from '@/assets/icons';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useClickOutside } from '@/hooks';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
	showMobileSidebar: boolean;
	setShowMobileSidebar: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<HeaderProps> = ({ showMobileSidebar, setShowMobileSidebar }) => {
	const [showUserMenu, setShowUserMenu, userMenuRef] = useClickOutside();

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
										src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
										alt='user photo'
										width={32}
										height={32}
									/>
								</button>
							</div>
							<AnimatePresence>{showUserMenu && <UserMenu />}</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
