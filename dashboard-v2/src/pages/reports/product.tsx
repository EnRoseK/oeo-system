import { productExpenseServices, productIncomeServices, productServices } from '@/api/services';
import { DatePicker, PageHeader, ProductReportList } from '@/components';
import { siteName, translations } from '@/constants';
import { IProduct, IProductExpense, IProductIncome } from '@/interfaces';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface ProductsReportProps {
  productIncomes: IProductIncome[];
  productExpenses: IProductExpense[];
  products: IProduct[];
}

export const getServerSideProps: GetServerSideProps<ProductsReportProps> = async (ctx) => {
  const [productsRes, productIncomesRes, productExpensesRes] = await Promise.all([
    productServices.getProducts({ limit: -1 }),
    productIncomeServices.getProductIncomes({ limit: -1 }),
    productExpenseServices.getProductExpenses({ limit: -1 }),
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
