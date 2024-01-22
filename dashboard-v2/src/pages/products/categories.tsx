import { categoryServices } from '@/api/services';
import { AddCategory, CategoryList, PageHeader, Pagination } from '@/components';
import { EditCategory } from '@/components/categories/EditCategory';
import { PAGE_SIZE, translations } from '@/constants';
import { useConfirm, useDrawer, useRefreshData } from '@/hooks';
import { ICategory, IPagination, ServiceQuery } from '@/interfaces';
import { errorHandler } from '@/utils';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { toast } from 'react-toastify';

interface ProductsCategoriesPageProps {
  categories: ICategory[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<ProductsCategoriesPageProps> = async (ctx) => {
  const { query } = ctx;
  const { page = '1', search } = query;

  const reqQuery: ServiceQuery = { page: Number(page), pageSize: PAGE_SIZE };
  if (search) {
    reqQuery.filters = { title: { $contains: search } };
  }

  const categoriesRes = await categoryServices.getCategories(reqQuery);

  return {
    props: {
      categories: categoriesRes.data,
      pagination: categoriesRes.meta.pagination,
    },
  };
};

const ProductsCategoriesPage: NextPage<ProductsCategoriesPageProps> = (props) => {
  const { categories = [], pagination } = props;
  const [openDrawer, closeDrawer] = useDrawer();
  const { isConfirmed } = useConfirm();
  const refreshData = useRefreshData();

  const openAddDrawer = () => {
    openDrawer(<AddCategory closeHandler={closeDrawer} />);
  };

  const openEditDrawer = (category: ICategory) => {
    openDrawer(<EditCategory closeHandler={closeDrawer} category={category} />);
  };

  const deleteHandler = async (id: number) => {
    try {
      const confirmed = await isConfirmed('Та энэ ангилалыг устгахдаа итгэлтэй байна уу?');
      if (!confirmed) return;

      await categoryServices.deleteCategory(id);

      toast.warning('Ангилалыг амжилттай устгалаа');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <Head>
        <title>{translations.categories} | Онч Энх Онош</title>
      </Head>

      <PageHeader
        title={translations.categories}
        breadcrumbItems={[{ title: translations.categories, url: '/products/categories' }]}
        showAddBtn
        addBtnHandler={openAddDrawer}
      />

      <CategoryList categories={categories} deleteHandler={deleteHandler} editHandler={openEditDrawer} />
      <Pagination pagination={pagination} />
    </>
  );
};

export default ProductsCategoriesPage;
