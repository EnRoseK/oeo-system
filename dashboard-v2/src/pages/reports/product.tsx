import { productReportServices } from '@/api/services';
import { DatePicker, PageHeader, ProductReportList } from '@/components';
import { siteName, translations } from '@/constants';
import { IProductReport, ServiceQuery } from '@/interfaces';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface ProductsReportProps {
  productReports: IProductReport[];
}

export const getServerSideProps: GetServerSideProps<ProductsReportProps> = async (ctx) => {
  const { query } = ctx;
  const { startDate, endDate } = query;
  const reqQuery: ServiceQuery = {
    filters: {},
  };
  if (startDate && endDate) {
    reqQuery.filters.$and = [
      { createdAt: { $lte: new Date(endDate as string).toISOString().replace('T00:00:00.000Z', 'T23:59:59.999Z') } },
      { createdAt: { $gte: new Date(startDate as string).toISOString() } },
    ];
  }

  const res = await productReportServices.getProductReports(reqQuery);

  return {
    props: {
      productReports: res.data,
    },
  };
};

const ProductsReport: NextPage<ProductsReportProps> = (props) => {
  const { productReports } = props;

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

      <ProductReportList productReports={productReports} />
    </>
  );
};

export default ProductsReport;
