import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import { DashboardLayout } from '@/layouts';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { ProvidersWrapper } from '@/ProvidersWrapper';
import { SessionProvider } from 'next-auth/react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page): ReactNode => <DashboardLayout>{page}</DashboardLayout>);

  return (
    <SessionProvider session={session}>
      <ProvidersWrapper>{getLayout(<Component {...pageProps} />)}</ProvidersWrapper>
    </SessionProvider>
  );
}
