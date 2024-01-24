import { PasswordForm, UserInformationForm } from '@/components';
import { Breadcrumbs } from '@/components/global/PageHeader/Breadcrumbs';
import { siteName, translations } from '@/constants';
import { NextPage } from 'next';
import Head from 'next/head';

const SettingsPage: NextPage = () => {
  const title = `${translations.settings} | ${siteName}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className='grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900'>
        <div className='mb-4 col-span-full xl:mb-2'>
          <Breadcrumbs items={[{ title: translations.settings, url: '/settings' }]} />
          <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white'>{translations.settings}</h1>
        </div>

        <div className='col-span-3'>
          <UserInformationForm />
          <PasswordForm />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
