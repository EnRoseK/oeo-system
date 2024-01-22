import { DatePicker, PageHeader } from '@/components';
import { translations } from '@/constants';
import { NextPage } from 'next';
import Head from 'next/head';

const IncomeReportPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{translations.incomeReport} | Онч Энх Онош</title>
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
    </>
  );
};

export default IncomeReportPage;
