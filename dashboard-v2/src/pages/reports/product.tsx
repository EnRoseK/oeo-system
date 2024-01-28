import { productExpenseServices, productIncomeServices, productServices } from '@/api/services';
import { DatePicker, PageHeader, ProductReportList } from '@/components';
import { siteName, translations } from '@/constants';
import { useCheckPermission } from '@/hooks';
import { IProduct, IProductExpense, IProductIncome } from '@/interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

interface ProductsReportProps {
  productIncomes: IProductIncome[];
  productExpenses: IProductExpense[];
  products: IProduct[];
}

export const getServerSideProps: GetServerSideProps<ProductsReportProps> = async (ctx) => {
  const { req } = ctx;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  const [productsRes, productIncomesRes, productExpensesRes] = await Promise.all([
    productServices.getProducts({ limit: -1, jwt: session.jwt }),
    productIncomeServices.getProductIncomes({ limit: -1, jwt: session.jwt }),
    productExpenseServices.getProductExpenses({ limit: -1, jwt: session.jwt }),
  ]);

  return {
    props: {
      products: productsRes.data,
      productExpenses: productExpensesRes.data,
      productIncomes: productIncomesRes.data,
    },
  };
};

const ProductsReport: NextPage<ProductsReportProps> = (props) => {
  const { products, productIncomes, productExpenses } = props;
  useCheckPermission('productReport');
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

      <ProductReportList products={products} productIncomes={productIncomes} productExpenses={productExpenses} />
    </>
  );
};

export default ProductsReport;
