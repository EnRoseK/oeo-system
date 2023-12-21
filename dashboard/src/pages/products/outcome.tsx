import { getAllProducts, getFilteredProductOutcomes, removeProductOutcome } from '@/api/services';
import { AddProductOutcomeDrawer } from '@/components/features';
import { CheckboxDropdown, DatePicker } from '@/components/form';
import { ProductOutcomesList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useAuth, useConfirm, useRefreshData } from '@/hooks';
import { IPagination, IProduct, IProductOutcome } from '@/interfaces';
import { errorHandler } from '@/utils';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ProductOutcomePageProps {
  productOutcomes: IProductOutcome[];
  pagination: IPagination;
  products: IProduct[];
}

export const getServerSideProps: GetServerSideProps<ProductOutcomePageProps> = async ({ query, req }) => {
  try {
    const { page = '1', search = '', product, startDate, endDate } = query;

    const [productOutcomesRes, productsRes] = await Promise.all([
      getFilteredProductOutcomes(
        Number(page),
        search as string,
        product as string,
        startDate as string,
        endDate as string,
        req.cookies['connect.sid'],
      ),
      getAllProducts(req.cookies['connect.sid']),
    ]);

    return {
      props: {
        productOutcomes: productOutcomesRes.data,
        pagination: productOutcomesRes.pagination,
        products: productsRes.data,
      },
    };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          redirect: {
            destination: '/login',
            statusCode: 302,
          },
        };
      }

      if (error.response?.status === 403) {
        return {
          redirect: {
            destination: '/',
            statusCode: 302,
          },
        };
      }
    }

    return {
      notFound: true,
    };
  }
};

const ProductOutcomePage: NextPage<ProductOutcomePageProps> = ({ productOutcomes, pagination, products }) => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const refreshData = useRefreshData();

  const { isConfirmed } = useConfirm();
  const [drawerStates, setDrawerStates] = useState({
    add: false,
  });

  const showDrawer = (drawer: 'add') => {
    setDrawerStates((prev) => ({ ...prev, [drawer]: true }));
  };

  const closeDrawer = (drawer: 'add') => {
    setDrawerStates((prev) => ({ ...prev, [drawer]: false }));
  };

  const deleteProduct = async (id: string) => {
    if (!currentUser?.permission.productOutcome.delete) return;

    try {
      const confirmed = await isConfirmed('Та энэ шинжилгээг устгахдаа итгэлтэй байна уу?');
      if (!confirmed) return;

      await removeProductOutcome(id);

      refreshData();
      toast.success(`${translations.productOutcome} амжилттай устлаа`);
    } catch (error) {
      errorHandler(error);
    }
  };

  const productFilterChangeHandler = (id: string, checked: boolean) => {
    let prodFilters = router.query.product;
    prodFilters = prodFilters ? (prodFilters as string).split(',') : [];

    if (checked) {
      prodFilters = [...prodFilters, id];
    } else {
      prodFilters = prodFilters.filter((c) => c !== id);
    }

    if (prodFilters.length === 0) {
      delete router.query.product;
      router.push({ query: router.query });
    } else {
      router.push({ query: { ...router.query, product: prodFilters.join(',') } });
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[
          { title: translations.products, url: '/products' },
          { title: translations.productOutcome, url: '/products/expense' },
        ]}
        title={translations.productOutcome}
        addBtnHandler={() => showDrawer('add')}
        showAddBtn={currentUser?.permission.productOutcome.create}
        extraFilters={
          <>
            <CheckboxDropdown
              title='Урвалжаар шүүх'
              items={products.map((p) => ({ label: p.title, value: p._id }))}
              onChangeHandler={productFilterChangeHandler}
              values={router.query.product ? (router.query.product as string).split(',') : []}
            />
            <div>
              <DatePicker />
            </div>
          </>
        }
      />

      <ProductOutcomesList productOutcomes={productOutcomes} deleteHandler={(id: string) => deleteProduct(id)} />
      <Pagination pagination={pagination} />

      {currentUser?.permission.productOutcome.create && (
        <AddProductOutcomeDrawer products={products} show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
      )}
    </>
  );
};

export default ProductOutcomePage;
