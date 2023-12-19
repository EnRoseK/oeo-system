import { getAllProducts, getFilteredProductIncomes, removeProductIncome } from '@/api/services';
import { AddProductIncomeDrawer } from '@/components/features';
import { ProductIncomeList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm, useRefreshData } from '@/hooks';
import { IPagination, IProduct, IProductIncome } from '@/interfaces';
import { errorHandler } from '@/utils';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ProductIncomePageProps {
  productIncomes: IProductIncome[];
  pagination: IPagination;
  products: IProduct[];
}

export const getServerSideProps: GetServerSideProps<ProductIncomePageProps> = async ({ query, req }) => {
  try {
    const { page } = query;

    const [productIncomesRes, productsRes] = await Promise.all([
      getFilteredProductIncomes(Number(page), req.cookies['connect.sid']),
      getAllProducts(req.cookies['connect.sid']),
    ]);

    return {
      props: {
        productIncomes: productIncomesRes.data,
        pagination: productIncomesRes.pagination,
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

const ProductIncomePage: NextPage<ProductIncomePageProps> = ({ productIncomes, pagination, products }) => {
  const refreshData = useRefreshData();
  const { isConfirmed } = useConfirm();
  const [drawerStates, setDrawerStates] = useState({
    add: false,
    edit: false,
  });

  const showDrawer = (drawer: 'add') => {
    setDrawerStates((prev) => ({ ...prev, [drawer]: true }));
  };

  const closeDrawer = (drawer: 'add') => {
    setDrawerStates((prev) => ({ ...prev, [drawer]: false }));
  };

  const deleteProductIncome = async (id: string) => {
    try {
      const confirmed = await isConfirmed('Та энэ урвалж орлогыг устгахдаа итгэлтэй байна уу?');

      if (!confirmed) return;

      await removeProductIncome(id);

      refreshData();
      toast.success('Урвалж орлого амжилттай устлаа');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[
          { title: translations.products, url: '/products' },
          { title: translations.productIncome, url: '/products/income' },
        ]}
        title={translations.productIncome}
        addBtnHandler={() => showDrawer('add')}
      />

      <ProductIncomeList productIncomes={productIncomes} deleteHandler={(id: string) => deleteProductIncome(id)} />
      <Pagination pagination={pagination} />

      <AddProductIncomeDrawer products={products} show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
    </>
  );
};

export default ProductIncomePage;
