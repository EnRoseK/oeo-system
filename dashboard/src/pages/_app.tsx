import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { DashboardLayout } from '@/layouts';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { ConfirmProvider } from '@/providers';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout =
		Component.getLayout ?? ((page): ReactNode => <DashboardLayout>{page}</DashboardLayout>);

	return (
		<ThemeProvider attribute='class'>
			<ConfirmProvider>{getLayout(<Component {...pageProps} />)}</ConfirmProvider>
		</ThemeProvider>
	);
}
