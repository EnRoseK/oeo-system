import { FC, ReactNode } from 'react';
import { AnimatePresence, motion, MotionConfig } from '@/libs';

interface DrawerProps {
	children: ReactNode;
	show: boolean;
	closeHandler: () => void;
}

export const Drawer: FC<DrawerProps> = ({ children, show, closeHandler }) => {
	return (
		<AnimatePresence>
			{show && (
				<MotionConfig transition={{ duration: 0.4, ease: 'anticipate' }}>
					<motion.div
						variants={{ initial: { opacity: 0, right: -200 }, animate: { opacity: 1, right: 0 } }}
						initial='initial'
						animate='animate'
						exit='initial'
						className='fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800'
						tabIndex={-1}
					>
						{children}
					</motion.div>

					<motion.div
						variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
						initial='initial'
						animate='animate'
						exit='initial'
						onClick={closeHandler}
						className='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30'
					/>
				</MotionConfig>
			)}
		</AnimatePresence>
	);
};
