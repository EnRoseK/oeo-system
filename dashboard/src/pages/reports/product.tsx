import { DatePicker } from '@/components/form';
import { PageHeader } from '@/components/ui';
import { translations } from '@/constants';
import { NextPage } from 'next';

const ProductReport: NextPage = () => {
  return (
    <>
      <PageHeader
        title={translations.productReport}
        breadcrumbItems={[{ title: translations.productReport, url: '/reports/product' }]}
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

export default ProductReport;
