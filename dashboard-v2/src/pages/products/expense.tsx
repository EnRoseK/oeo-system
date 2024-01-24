import { productExpenseServices, productServices } from '@/api/services';
import {
  AddProductExpense,
  CheckboxDropdown,
  DatePicker,
  PageHeader,
  Pagination,
  ProductExpensesList,
} from '@/components';
import { PAGE_SIZE, siteName, translations } from '@/constants';
import { useConfirm, useDrawer, useRefreshData } from '@/hooks';
import { IPagination, IProduct, IProductExpense, ServiceQuery } from '@/interfaces';
import { errorHandler } from '@/utils';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface ProductExpensePageProps {
  productExpenses: IProductExpense[];
  pagination: IPagination;
  products: IProduct[];
}

export const getServerSideProps: GetServerSideProps<ProductExpensePageProps> = async (ctx) => {
  const { query } = ctx;
  const { page = '1', search, product, startDate, endDate } = query;

  const reqQuery: ServiceQuery = {
    page: Number(page),
    pageSize: PAGE_SIZE,
    filters: { product: {} },
  };
  if (search) {
    reqQuery.filters.product.title = {
      $contains: search,
    };
  }
  if (product) {
    reqQuery.filters.product.id = {
      $in: (product as string).split(','),
    };
  }
  if (startDate && endDate) {
    reqQuery.filters.$and = [
      { createdAt: { $lte: new Date(endDate as string).toISOString().replace('T00:00:00.000Z', 'T23:59:59.999Z') } },
      { createdAt: { $gte: new Date(startDate as string).toISOString() } },
    ];
  }

  const [productExpensesRes, productsRes] = await Promise.all([
    productExpenseServices.getProductExpenses(reqQuery),
    productServices.getProducts({ limit: -1 }),
  ]);

  return {
    props: {
      productExpenses: productExpensesRes.data,
      pagination: productExpensesRes.meta.pagination,
      products: productsRes.data,
    },
  };
};

const ProductExpensePage: NextPage<ProductExpensePageProps> = (props) => {
  const title = `${translations.productExpense} | ${siteName}`;

  const { productExpenses = [], pagination, products = [] } = props;
  const router = useRouter();
  const [openDrawer, closeDrawer] = useDrawer();
  const { isConfirmed } = useConfirm();
  const refreshData = useRefreshData();

  const productFilterChangeHandler = (value: string, checked: boolean) => {
    let prodFilters = router.query.product;
    prodFilters = prodFilters ? (prodFilters as string).split(',') : [];

    if (checked) {
      prodFilters = [...prodFilters, value];
    } else {
      prodFilters = prodFilters.filter((c) => c !== value);
    }

    if (prodFilters.length === 0) {
      delete router.query.product;
      router.push({ query: router.query });
    } else {
      router.push({ query: { ...router.query, product: prodFilters.join(',') } });
    }
  };

  const openAddDrawer = () => {
    openDrawer(<AddProductExpense closeHandler={closeDrawer} products={products} />);
  };

  const deleteHandler = async (id: number) => {
    try {
      const confirmed = await isConfirmed('Та энэ шинжилгээг устгахдаа итгэлтэй байна уу?');
      if (!confirmed) return;

      await productExpenseServices.deleteProductExpense(id);

      toast.warning('Шинжилгээг амжилттай устгалаа');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <PageHeader
        breadcrumbItems={[
          { title: translations.products, url: '/products' },
          { title: translations.productExpense, url: '/products/expense' },
        ]}
        title={translations.productExpense}
        addBtnHandler={openAddDrawer}
        showAddBtn
        extraFilters={
          <>
            <CheckboxDropdown
              title='Урвалжаар шүүх'
              items={products.map((p) => ({ label: p.title, value: p.id.toString() }))}
              onChangeHandler={productFilterChangeHandler}
              values={router.query.product ? (router.query.product as string).split(',') : []}
            />
            <div>
              <DatePicker />
            </div>
          </>
        }
      />
      <ProductExpensesList productExpenses={productExpenses} deleteHandler={deleteHandler} />
      <Pagination pagination={pagination} />
    </>
  );
};

export default ProductExpensePage;
