import { getAllCategories, getFilteredProducts, removeProduct } from '@/api/services';
import { AddProductDrawer, EditProductDrawer } from '@/components/features';
import { ProductList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm, useRefreshData } from '@/hooks';
import { ICategory, IPagination, IProduct } from '@/interfaces';
import { errorHandler } from '@/utils';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ProductsPageProps {
  products: IProduct[];
  pagination: IPagination;
  categories: ICategory[];
}

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async ({ query }) => {
  const { page = '1', search = '' } = query;

  const [productsRes, categoryRes] = await Promise.all([
    getFilteredProducts(Number(page), search as string),
    getAllCategories(),
  ]);

  return {
    props: {
      products: productsRes.data,
      pagination: productsRes.pagination,
      categories: categoryRes.data,
    },
  };
};

const ProductsPage: NextPage<ProductsPageProps> = ({ products, pagination, categories }) => {
  const refreshData = useRefreshData();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined);
  const { isConfirmed } = useConfirm();
  const [drawerStates, setDrawerStates] = useState({
    add: false,
    edit: false,
  });

  const showDrawer = (drawer: 'add' | 'edit') => {
    setDrawerStates((prev) => ({ ...prev, [drawer]: true }));
  };

  const closeDrawer = (drawer: 'add' | 'edit') => {
    setDrawerStates((prev) => ({ ...prev, [drawer]: false }));
  };

  const deleteProduct = async (id: string) => {
    try {
      const confirmed = await isConfirmed('Та энэ урвалжийг устгахдаа итгэлтэй байна уу?');

      if (!confirmed) return;

      await removeProduct(id);

      refreshData();
      toast.success('Урвалж амжилттай устлаа');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[{ title: translations.products, url: '/products' }]}
        title={translations.products}
        addBtnHandler={() => showDrawer('add')}
      />
      <ProductList
        products={products}
        editHandler={(product: IProduct) => {
          showDrawer('edit');
          setSelectedProduct(product);
        }}
        deleteHandler={(id: string) => deleteProduct(id)}
      />
      <Pagination pagination={pagination} />

      {/* Add Product Drawer */}
      <AddProductDrawer categories={categories} show={drawerStates.add} closeHandler={() => closeDrawer('add')} />

      {/* Edit Product Drawer */}
      <EditProductDrawer
        product={selectedProduct}
        categories={categories}
        show={drawerStates.edit}
        closeHandler={() => closeDrawer('edit')}
      />
    </>
  );
};

export default ProductsPage;
