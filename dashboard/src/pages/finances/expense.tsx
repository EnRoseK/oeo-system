import { getFilteredFinanceExpenses, removeFinanceExpense } from '@/api/services';
import { AddFinanceExpenseDrawer } from '@/components/features';
import { CheckboxDropdown, DatePicker } from '@/components/form';
import { FinanceExpenseList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useAuth, useConfirm, useRefreshData } from '@/hooks';
import { IFinanceExpense, IPagination } from '@/interfaces';
import { errorHandler } from '@/utils';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker';
import { toast } from 'react-toastify';

interface FinanceExpensePageProps {
  financeExpenses: IFinanceExpense[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<FinanceExpensePageProps> = async ({ query, req }) => {
  try {
    const { page = '1', type, startDate, endDate } = query;

    const financeExpensesRes = await getFilteredFinanceExpenses(
      Number(page),
      type as string,
      startDate as string,
      endDate as string,
      req.cookies['connect.sid'],
    );

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
  const router = useRouter();
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

  const typeFilterChangeHandler = (value: string, checked: boolean) => {
    let typeFilters = router.query.type;
    typeFilters = typeFilters ? (typeFilters as string).split(',') : [];

    if (checked) {
      typeFilters = [...typeFilters, value];
    } else {
      typeFilters = typeFilters.filter((c) => c !== value);
    }

    if (typeFilters.length === 0) {
      delete router.query.type;
      router.push({ query: router.query });
    } else {
      router.push({ query: { ...router.query, type: typeFilters.join(',') } });
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[{ title: translations.financeExpense, url: '/finances/expense' }]}
        title={translations.financeExpense}
        addBtnHandler={() => showDrawer('add')}
        showAddBtn={currentUser?.permission.financeExpense.create}
        showSearch={false}
        extraFilters={
          <>
            <div className='mr-4'>
              <DatePicker />
            </div>

            <CheckboxDropdown
              title='Төрлөөр шүүх'
              items={[
                { label: 'Урвалж орлого', value: 'PRODUCT' },
                { label: 'Цалин', value: 'SALARY' },
                { label: 'Түрээс', value: 'RENT' },
                { label: 'Татвар', value: 'TAX' },
                { label: 'Бусад', value: 'OTHER' },
              ]}
              onChangeHandler={typeFilterChangeHandler}
              values={router.query.type ? (router.query.type as string).split(',') : []}
            />
          </>
        }
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
