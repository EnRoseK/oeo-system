import { getAllProducts, getFilteredProductOutcomes, removeProductOutcome } from '@/api/services';
import { AddProductOutcomeDrawer } from '@/components/features';
import { ProductOutcomesList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm, useRefreshData } from '@/hooks';
import { IPagination, IProduct, IProductOutcome } from '@/interfaces';
import { errorHandler } from '@/utils';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ProductOutcomePageProps {
  productOutcomes: IProductOutcome[];
  pagination: IPagination;
  products: IProduct[];
}

export const getServerSideProps: GetServerSideProps<ProductOutcomePageProps> = async ({ query }) => {
  const { page = '1' } = query;

  const [productOutcomesRes, productsRes] = await Promise.all([
    getFilteredProductOutcomes(Number(page)),
    getAllProducts(),
  ]);

  return {
    props: {
      productOutcomes: productOutcomesRes.data,
      pagination: productOutcomesRes.pagination,
      products: productsRes.data,
    },
  };
};

const ProductOutcomePage: NextPage<ProductOutcomePageProps> = ({ productOutcomes, pagination, products }) => {
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
    try {
      const confirmed = await isConfirmed('Та энэ урвалж зарлагыг устгахдаа итгэлтэй байна уу?');
      if (!confirmed) return;

      await removeProductOutcome(id);

      refreshData();
      toast.success('Урвалж зарлага амжилттай устлаа');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[
          { title: translations.products, url: '/products' },
          { title: translations.productExpense, url: '/products/expense' },
        ]}
        title={translations.productExpense}
        addBtnHandler={() => showDrawer('add')}
      />

      <ProductOutcomesList productOutcomes={productOutcomes} deleteHandler={(id: string) => deleteProduct(id)} />
      <Pagination pagination={pagination} />

      <AddProductOutcomeDrawer products={products} show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
    </>
  );
};

export default ProductOutcomePage;
