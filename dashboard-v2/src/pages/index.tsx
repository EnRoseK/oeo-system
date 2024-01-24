import { siteName, translations } from '@/constants';
import { NextPage } from 'next';
import Head from 'next/head';

const Dashboard: NextPage = () => {
  const title = translations.dashboard + ' | ' + siteName;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
