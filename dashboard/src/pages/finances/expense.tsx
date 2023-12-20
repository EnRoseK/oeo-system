import { getFilteredFinanceExpenses, removeFinanceExpense } from '@/api/services';
import { AddFinanceExpenseDrawer } from '@/components/features';
import { FinanceExpenseList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useAuth, useConfirm, useRefreshData } from '@/hooks';
import { IFinanceExpense, IPagination } from '@/interfaces';
import { errorHandler } from '@/utils';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface FinanceExpensePageProps {
  financeExpenses: IFinanceExpense[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<FinanceExpensePageProps> = async ({ query, req }) => {
  try {
    const { page = '1' } = query;

    const financeExpensesRes = await getFilteredFinanceExpenses(Number(page), req.cookies['connect.sid']);

    return {
      props: {
        financeExpenses: financeExpensesRes.data,
        pagination: financeExpensesRes.pagination,
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

const FinanceExpensePage: NextPage<FinanceExpensePageProps> = ({ financeExpenses, pagination }) => {
  const { currentUser } = useAuth();
  const refreshData = useRefreshData();
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
    if (!currentUser?.permission.financeExpense.delete) return;
    try {
      const confirmed = await isConfirmed('Та энэ санхүүгийн зарлагыг устгахдаа итгэлтэй байна уу?');
      if (!confirmed) return;

      await removeFinanceExpense(id);
      refreshData();
      toast.success('Санхүүгийн зарлага амжилттай устлаа');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[{ title: translations.financeExpense, url: '/finances/expense' }]}
        title={translations.financeExpense}
        addBtnHandler={() => showDrawer('add')}
        showAddBtn={currentUser?.permission.financeExpense.create}
      />

      <FinanceExpenseList financeExpesnes={financeExpenses} deleteHandler={(id: string) => deleteProduct(id)} />
      <Pagination pagination={pagination} />

      {currentUser?.permission.financeExpense.create && (
        <AddFinanceExpenseDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
      )}
    </>
  );
};

export default FinanceExpensePage;
