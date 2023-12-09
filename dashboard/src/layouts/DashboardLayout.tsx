import { Footer, Header, MainWrapper, Sidebar } from '@/components/ui';
import { FC, ReactNode, useState } from 'react';

interface DashboardLayoutProps {
	children: ReactNode;
}

const classNames = ['ml-64'];

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
	const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);

	return (
		<>
			<Header showMobileSidebar={showMobileSidebar} setShowMobileSidebar={setShowMobileSidebar} />
			<div className='flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900'>
				<Sidebar showMobileSidebar={showMobileSidebar} />

				<MainWrapper>
					<main>{children}</main>
					<Footer />
				</MainWrapper>
			</div>
		</>
	);
};
