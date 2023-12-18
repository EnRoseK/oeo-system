import { getFilteredFinanceExpenses, removeFinanceExpense } from '@/api/services';
import { AddFinanceExpenseDrawer } from '@/components/features';
import { FinanceExpenseList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm, useRefreshData } from '@/hooks';
import { IFinanceExpense, IPagination } from '@/interfaces';
import { errorHandler } from '@/utils';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface FinanceExpensePageProps {
  financeExpenses: IFinanceExpense[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<FinanceExpensePageProps> = async ({ query }) => {
  const { page = '1' } = query;

  const financeExpensesRes = await getFilteredFinanceExpenses(Number(page));

  return {
    props: {
      financeExpenses: financeExpensesRes.data,
      pagination: financeExpensesRes.pagination,
    },
  };
};

const FinanceExpensePage: NextPage<FinanceExpensePageProps> = ({ financeExpenses, pagination }) => {
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
      />

      <FinanceExpenseList financeExpesnes={financeExpenses} deleteHandler={(id: string) => deleteProduct(id)} />
      <Pagination pagination={pagination} />

      <AddFinanceExpenseDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
    </>
  );
};

export default FinanceExpensePage;
