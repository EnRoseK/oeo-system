import { categoryServices, productServices } from '@/api/services';
import { AddProduct, CheckboxDropdown, EditProduct, PageHeader, Pagination, ProductList } from '@/components';
import { PAGE_SIZE, siteName, translations } from '@/constants';
import { useCheckPermission, useConfirm, useDrawer, useRefreshData } from '@/hooks';
import { ICategory, IPagination, IProduct, ServiceQuery } from '@/interfaces';
import { errorHandler } from '@/utils';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface ProductsPageProps {
  products: IProduct[];
  pagination: IPagination;
  categories: ICategory[];
}

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async (ctx) => {
  const { query, req } = ctx;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  const { page = '1', search, category } = query;

  const reqQuery: ServiceQuery = {
    page: Number(page),
    pageSize: PAGE_SIZE,
    filters: {},
    jwt: session.jwt,
  };
  if (search) {
    reqQuery.filters.title = { $contains: search };
  }
  if (category) {
    reqQuery.filters.product_category = { id: { $in: (category as string).split(',') } };
  }

  const [productsRes, categoriesRes] = await Promise.all([
    productServices.getProducts(reqQuery),
    categoryServices.getCategories({ limit: -1, jwt: session.jwt }),
  ]);

  return {
    props: {
      products: productsRes.data,
      pagination: productsRes.meta.pagination,
      categories: categoriesRes.data,
    },
  };
};

const ProductsPage: NextPage<ProductsPageProps> = (props) => {
  const title = `${translations.products} | ${siteName}`;
  useCheckPermission('product');
  const { products = [], pagination, categories = [] } = props;
  const router = useRouter();
  const [openDrawer, closeDrawer] = useDrawer();
  const { isConfirmed } = useConfirm();
  const refreshData = useRefreshData();
  const { data: session } = useSession();

  const categoryFilterChangeHandler = (value: string, checked: boolean) => {
    let cFilters = router.query.category;
    cFilters = cFilters ? (cFilters as string).split(',') : [];

    if (checked) {
      cFilters = [...cFilters, value];
    } else {
      cFilters = cFilters.filter((c) => c !== value);
    }

    if (cFilters.length === 0) {
      delete router.query.category;
      router.push({ query: router.query });
    } else {
      router.push({ query: { ...router.query, category: cFilters.join(',') } });
    }
  };

  const openAddDrawer = () => {
    openDrawer(<AddProduct closeHandler={closeDrawer} categories={categories} />);
  };

  const openEditDrawer = (product: IProduct) => {
    openDrawer(<EditProduct closeHandler={closeDrawer} product={product} categories={categories} />);
  };

  const deleteHandler = async (id: number) => {
    try {
      const confirmed = await isConfirmed('Та энэ урвалжийг устгахдаа итгэлтэй байна уу?');
      if (!confirmed) return;

      await productServices.deleteProduct(id, session?.jwt!);

      toast.warning('Урвалжийг амжилттай устгалаа');
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
        title={translations.products}
        breadcrumbItems={[{ title: translations.products, url: '/products' }]}
        showAddBtn
        addBtnHandler={openAddDrawer}
        extraFilters={
          <>
            <CheckboxDropdown
              title='Ангилалаар шүүх'
              items={categories.map((c) => ({ label: c.title, value: c.id.toString() }))}
              onChangeHandler={categoryFilterChangeHandler}
              values={router.query.category ? (router.query.category as string).split(',') : []}
            />
          </>
        }
      />

      <ProductList products={products} deleteHandler={deleteHandler} editHandler={openEditDrawer} />
      <Pagination pagination={pagination} />
    </>
  );
};

export default ProductsPage;
