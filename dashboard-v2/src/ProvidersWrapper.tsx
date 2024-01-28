import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';
import { DrawerProvider, ConfirmProvider, CurrentUserProvider } from '@/providers';
import NextProgress from 'next-progress';
import { ToastContainer } from 'react-toastify';

interface ProvidersWrapperProps {
  children: ReactNode;
}

export const ProvidersWrapper: FC<ProvidersWrapperProps> = (props) => {
  const { children } = props;

  return (
    <CurrentUserProvider>
      <ThemeProvider attribute='class'>
        <DrawerProvider>
          <ConfirmProvider>
            {children}

            <NextProgress height={3} color='#3b82f6' />
            <ToastContainer
              position='top-center'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
          </ConfirmProvider>
        </DrawerProvider>
      </ThemeProvider>
    </CurrentUserProvider>
  );
};
