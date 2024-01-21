import { DatePicker, PageHeader } from '@/components';
import { translations } from '@/constants';
import { NextPage } from 'next';

const ProductsReport: NextPage = () => {
  return (
    <>
      <PageHeader
        title={translations.productReport}
        breadcrumbItems={[{ title: translations.productReport, url: '/reports/product' }]}
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

export default ProductsReport;
