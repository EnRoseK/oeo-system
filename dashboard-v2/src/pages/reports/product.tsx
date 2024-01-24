import { DatePicker, PageHeader, ProductReportList } from '@/components';
import { siteName, translations } from '@/constants';
import { NextPage } from 'next';
import Head from 'next/head';

const ProductsReport: NextPage = () => {
  const title = `${translations.productReport} | ${siteName}`;

  return (
    <>
      <Head>
        <title>{title}</title>
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

      <ProductReportList />
    </>
  );
};

export default ProductsReport;
