import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { DashboardLayout } from '@/layouts';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { ConfirmProvider } from '@/providers';
import { ToastContainer } from 'react-toastify';
import NextProgress from 'next-progress';
import Head from 'next/head';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page): ReactNode => <DashboardLayout>{page}</DashboardLayout>);

  return (
    <>
      <Head>
        <title>Онч Энх Онош</title>
      </Head>

      <ThemeProvider attribute='class'>
        <ConfirmProvider>
          {getLayout(<Component {...pageProps} />)}
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
          <NextProgress height={3} color='#3b82f6' />
        </ConfirmProvider>
      </ThemeProvider>
    </>
  );
}
