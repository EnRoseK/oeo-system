import { getAllCategories, getFilteredProducts } from '@/api/services';
import { AddProductDrawer, EditProductDrawer } from '@/components/features';
import { ProductList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm } from '@/hooks';
import { ICategory, IPagination, IProduct } from '@/interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

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

  const deleteProduct = async () => {
    try {
      const confirmed = await isConfirmed('Та энэ урвалжийг устгахдаа итгэлтэй байна уу?');
    } catch (error) {}
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[{ title: translations.products, url: '/products' }]}
        title={translations.products}
        addBtnHandler={() => showDrawer('add')}
      />
      <ProductList products={products} editHandler={() => showDrawer('edit')} deleteHandler={() => deleteProduct()} />
      <Pagination pagination={pagination} />

      {/* Add Product Drawer */}
      <AddProductDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />

      {/* Edit Product Drawer */}
      <EditProductDrawer show={drawerStates.edit} closeHandler={() => closeDrawer('edit')} />
    </>
  );
};

export default ProductsPage;
