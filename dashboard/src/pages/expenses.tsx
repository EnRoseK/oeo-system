import { getFilteredExpenses } from '@/api/services';
import { DatePicker } from '@/components/form';
import { ExpenseList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { IExpense, IPagination } from '@/interfaces';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';

interface ExpensesProps {
  expenses: IExpense[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<ExpensesProps> = async ({ query, req }) => {
  try {
    const { page = '1', search = '', startDate, endDate } = query;

    const [expensesRes] = await Promise.all([
      getFilteredExpenses({
        page: Number(page),
        search: search as string,
        startDate: startDate as string,
        endDate: endDate as string,
        cookie: req.cookies['connect.sid'],
      }),
    ]);

    return {
      props: {
        expenses: expensesRes.data,
        pagination: expensesRes.pagination,
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

const Expenses: NextPage<ExpensesProps> = ({ expenses, pagination }) => {
  return (
    <>
      <PageHeader
        title={translations.expense}
        breadcrumbItems={[{ title: translations.expense, url: '/expenses' }]}
        showSearch={false}
        extraFilters={
          <>
            <DatePicker />
          </>
        }
      />
      <ExpenseList expenses={expenses} />
      <Pagination pagination={pagination} />
    </>
  );
};

export default Expenses;
