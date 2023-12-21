import { getAllCategories, getFilteredProducts, removeProduct } from '@/api/services';
import { AddProductDrawer, EditProductDrawer } from '@/components/features';
import { CheckboxDropdown } from '@/components/form';
import { ProductList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useAuth, useConfirm, useRefreshData } from '@/hooks';
import { ICategory, IPagination, IProduct } from '@/interfaces';
import { errorHandler } from '@/utils';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ProductsPageProps {
  products: IProduct[];
  pagination: IPagination;
  categories: ICategory[];
}

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async ({ query, req }) => {
  try {
    const { page = '1', search = '', category = '' } = query;

    const [productsRes, categoryRes] = await Promise.all([
      getFilteredProducts(Number(page), search as string, category as string, req.cookies['connect.sid']),
      getAllCategories(req.cookies['connect.sid']),
    ]);

    return {
      props: {
        products: productsRes.data,
        pagination: productsRes.pagination,
        categories: categoryRes.data,
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

const ProductsPage: NextPage<ProductsPageProps> = ({ products, pagination, categories }) => {
  const router = useRouter();
  const { currentUser } = useAuth();
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
    if (!currentUser?.permission.product.delete) return;

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

  const categoryFilterChangeHandler = (id: string, checked: boolean) => {
    let cFilters = router.query.category;
    cFilters = cFilters ? (cFilters as string).split(',') : [];

    if (checked) {
      cFilters = [...cFilters, id];
    } else {
      cFilters = cFilters.filter((c) => c !== id);
    }

    if (cFilters.length === 0) {
      delete router.query.category;
      router.push({ query: router.query });
    } else {
      router.push({ query: { ...router.query, category: cFilters.join(',') } });
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[{ title: translations.products, url: '/products' }]}
        title={translations.products}
        addBtnHandler={() => showDrawer('add')}
        showAddBtn={currentUser?.permission.product.create}
        extraFilters={
          <>
            <CheckboxDropdown
              title='Ангилалаар шүүх'
              items={categories.map((c) => ({ label: c.title, value: c._id }))}
              onChangeHandler={categoryFilterChangeHandler}
              values={router.query.category ? (router.query.category as string).split(',') : []}
            />
          </>
        }
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
      {currentUser?.permission.product.create && (
        <AddProductDrawer categories={categories} show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
      )}

      {/* Edit Product Drawer */}
      {currentUser?.permission.product.update && (
        <EditProductDrawer
          product={selectedProduct}
          categories={categories}
          show={drawerStates.edit}
          closeHandler={() => closeDrawer('edit')}
        />
      )}
    </>
  );
};

export default ProductsPage;
