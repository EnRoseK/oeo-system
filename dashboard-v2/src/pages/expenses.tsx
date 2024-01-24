import { expenseServices } from '@/api/services';
import {
  AddExpense,
  CheckboxDropdown,
  DatePicker,
  EditExpense,
  ExpenseList,
  PageHeader,
  Pagination,
} from '@/components';
import { PAGE_SIZE, siteName, translations } from '@/constants';
import { useConfirm, useDrawer, useRefreshData } from '@/hooks';
import { IExpense, IPagination, ServiceQuery } from '@/interfaces';
import { errorHandler } from '@/utils';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface ExpensesPageProps {
  expenses: IExpense[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<ExpensesPageProps> = async (ctx) => {
  const { query } = ctx;
  const { page = '1', search, type, startDate, endDate } = query;
  const reqQuery: ServiceQuery = {
    page: Number(page),
    pageSize: PAGE_SIZE,
    filters: {},
  };
  if (search) {
    reqQuery.filters.name = { $contains: search };
  }
  if (type) {
    reqQuery.filters.type = { $in: (type as string).split(',') };
  }
  if (startDate && endDate) {
    reqQuery.filters.$and = [
      { createdAt: { $lte: new Date(endDate as string).toISOString().replace('T00:00:00.000Z', 'T23:59:59.999Z') } },
      { createdAt: { $gte: new Date(startDate as string).toISOString() } },
    ];
  }

  const expensesRes = await expenseServices.getExpenses(reqQuery);

  return {
    props: {
      expenses: expensesRes.data,
      pagination: expensesRes.meta.pagination,
    },
  };
};

const ExpensesPage: NextPage<ExpensesPageProps> = (props) => {
  const title = `${translations.expense} | ${siteName}`;

  const { expenses = [], pagination } = props;
  const [openDrawer, closeDrawer] = useDrawer();
  const { isConfirmed } = useConfirm();
  const router = useRouter();
  const refreshData = useRefreshData();

  const openAddDrawer = () => {
    openDrawer(<AddExpense closeHandler={closeDrawer} />);
  };

  const openEditDrawer = (expense: IExpense) => {
    openDrawer(<EditExpense closeHandler={closeDrawer} expense={expense} />);
  };

  const deleteHandler = async (id: number) => {
    try {
      const confirmed = await isConfirmed('Та энэ зарлагыг устгахдаа итгэлтэй байна уу?');
      if (!confirmed) return;

      await expenseServices.deleteExpense(id);

      toast.warning('Зарлагыг амжилттай устгалаа');
      refreshData();
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
      <Head>
        <title>{title}</title>
      </Head>

      <PageHeader
        title={translations.expense}
        breadcrumbItems={[{ title: translations.expense, url: '/expenses' }]}
        showAddBtn
        addBtnHandler={openAddDrawer}
        extraFilters={
          <>
            <CheckboxDropdown
              title='Төрлөөр шүүх'
              items={[
                { value: 'CARD', label: 'Карт' },
                { value: 'CASH', label: 'Бэлэн мөнгө' },
                { value: 'TRANSFER', label: 'Шилжүүлэг' },
                { value: 'RENT', label: 'Зээл' },
              ]}
              onChangeHandler={typeFilterChangeHandler}
              values={router.query.type ? (router.query.type as string).split(',') : []}
            />
            <div>
              <DatePicker />
            </div>
          </>
        }
      />
      <ExpenseList expenses={expenses} editHandler={openEditDrawer} deleteHandler={deleteHandler} />

      <Pagination pagination={pagination} />
    </>
  );
};

export default ExpensesPage;
