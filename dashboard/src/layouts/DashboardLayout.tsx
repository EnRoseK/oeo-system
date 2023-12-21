import { Footer, Header, MainWrapper, Sidebar } from '@/components/ui';
import { FC, ReactNode, useLayoutEffect, useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const classNames = ['ml-64'];

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth >= 1024) {
        setShowMobileSidebar(true);
      }
    }
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      <Header showMobileSidebar={showMobileSidebar} setShowMobileSidebar={setShowMobileSidebar} />
      <div className='flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900'>
        <Sidebar showMobileSidebar={showMobileSidebar} />

        <MainWrapper>
          <main className='overflow-y-auto flex-1'>{children}</main>
          <Footer />
        </MainWrapper>
      </div>
    </>
  );
};
