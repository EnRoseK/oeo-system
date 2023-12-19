import { getFilteredCategories, removeCategory } from '@/api/services';
import { AddCategoryDrawer, EditCategoryDrawer } from '@/components/features';
import { CategoryList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm, useRefreshData } from '@/hooks';
import { ICategory, IPagination } from '@/interfaces';
import { errorHandler } from '@/utils';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface CategoriesPageProps {
  categories: ICategory[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<CategoriesPageProps> = async ({ query, req }) => {
  try {
    const { page = '1', search = '' } = query;

    const categoriesRes = await getFilteredCategories(Number(page), search as string, req.cookies['connect.sid']);

    return {
      props: {
        categories: categoriesRes.data,
        pagination: categoriesRes.pagination,
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

const CategoriesPage: NextPage<CategoriesPageProps> = ({ categories, pagination }) => {
  const refreshData = useRefreshData();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined);
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

  const deleteCategory = async (id: string) => {
    try {
      const confirmed = await isConfirmed('Та энэ ангилалыг устгахдаа итгэлтэй байна уу?');

      if (!confirmed) return;

      await removeCategory(id);
      toast.success('Ангилал амжилттай устлаа');
      refreshData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[{ title: translations.categories, url: '/categories' }]}
        title={translations.categories}
        addBtnHandler={() => showDrawer('add')}
      />
      <CategoryList
        categories={categories}
        editHandler={(category: ICategory) => {
          showDrawer('edit');
          setSelectedCategory(category);
        }}
        deleteHandler={(id: string) => deleteCategory(id)}
      />
      <Pagination pagination={pagination} />

      <AddCategoryDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />

      <EditCategoryDrawer
        show={drawerStates.edit}
        closeHandler={() => closeDrawer('edit')}
        category={selectedCategory}
      />
    </>
  );
};

export default CategoriesPage;
