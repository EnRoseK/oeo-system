import { Footer, Header, Sidebar } from '@/components';
import { useAnimation } from '@/hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props;
  const { data, status } = useSession();

  const router = useRouter();
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const [renderMobileSidebar, onAnimationEnd] = useAnimation(showMobileSidebar);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    function updateSize() {
      if (window.innerWidth >= 1024) {
        setShowMobileSidebar(true);
      }
    }
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (!data && status === 'unauthenticated') {
      router.replace('/login');
    } else {
      setIsLoading(false);
    }
  }, [data, router, status]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Header showMobileSidebar={showMobileSidebar} setShowMobileSidebar={setShowMobileSidebar} />
      <div className='flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900'>
        {renderMobileSidebar && (
          <Sidebar
            show={showMobileSidebar}
            onAnimationEnd={onAnimationEnd}
            closeHandler={() => setShowMobileSidebar(false)}
          />
        )}

        <div className='relative w-full min-h-[calc(100vh_-_64px)] bg-gray-50 lg:ml-64 dark:bg-gray-900'>
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};
