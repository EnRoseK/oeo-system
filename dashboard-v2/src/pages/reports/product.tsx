import { DatePicker, PageHeader } from '@/components';
import { translations } from '@/constants';
import { NextPage } from 'next';
import Head from 'next/head';

const ProductsReport: NextPage = () => {
  return (
    <>
      <Head>
        <title>{translations.productReport} | Онч Энх Онош</title>
      </Head>

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
