import { DatePicker, IncomeReportList, PageHeader } from '@/components';
import { siteName, translations } from '@/constants';
import { NextPage } from 'next';
import Head from 'next/head';

const IncomeReportPage: NextPage = () => {
  const title = `${translations.incomeReport} | ${siteName}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <PageHeader
        title={translations.incomeReport}
        breadcrumbItems={[{ title: translations.incomeReport, url: '/reports/income' }]}
        showSearch={false}
        extraFilters={
          <>
            <div>
              <DatePicker />
            </div>
          </>
        }
      />
      <IncomeReportList />
    </>
  );
};

export default IncomeReportPage;
