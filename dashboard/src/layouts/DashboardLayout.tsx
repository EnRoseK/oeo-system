import { Footer, Header, MainWrapper, Sidebar } from '@/components/ui';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useLayoutEffect, useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const classNames = ['ml-64'];

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
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

  useLayoutEffect(() => {
    if (window.innerWidth >= 1024) {
      setShowMobileSidebar(true);
    } else {
      setShowMobileSidebar(false);
    }
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      if (window.innerWidth < 1024) {
        setShowMobileSidebar(false);
      }
    });

    return () => {
      router.events.off('routeChangeStart', () => {
        if (window.innerWidth < 1024) {
          setShowMobileSidebar(false);
        }
      });
    };
  }, [router]);

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
