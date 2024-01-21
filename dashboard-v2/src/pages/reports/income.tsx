import { DatePicker, PageHeader } from '@/components';
import { translations } from '@/constants';
import { NextPage } from 'next';

const IncomeReportPage: NextPage = () => {
  return (
    <>
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
