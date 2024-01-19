import { DatePicker } from '@/components/form';
import { PageHeader } from '@/components/ui';
import { translations } from '@/constants';
import { NextPage } from 'next';

const IncomeReport: NextPage = () => {
  return (
    <>
      <PageHeader
        title={translations.incomeReport}
        breadcrumbItems={[{ title: translations.incomeReport, url: '/reports/income' }]}
        showSearch={false}
        extraFilters={
          <>
            <DatePicker />
          </>
        }
      />
    </>
  );
};

export default IncomeReport;
