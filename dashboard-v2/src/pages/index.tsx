import { translations } from '@/constants';
import { NextPage } from 'next';
import Head from 'next/head';

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>{translations.dashboard} | Онч Энх Онош</title>
      </Head>
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
