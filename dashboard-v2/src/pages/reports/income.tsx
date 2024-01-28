import { expenseServices, productExpenseServices } from '@/api/services';
import { DatePicker, IncomeReportList, PageHeader } from '@/components';
import { siteName, translations } from '@/constants';
import { useCheckPermission } from '@/hooks';
import { IExpense, IProductExpense, ServiceQuery } from '@/interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

interface IncomeReportPageProps {
  expenses: IExpense[];
  productExpense: IProductExpense[];
}

export const getServerSideProps: GetServerSideProps<IncomeReportPageProps> = async (ctx) => {
  const { query, req } = ctx;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  const { startDate, endDate } = query;

  if (!startDate || !endDate) {
    return {
      props: {
        expenses: [],
        productExpense: [],
      },
    };
  }

  const reqQuery: ServiceQuery = {
    jwt: session.jwt,
    limit: -1,
    filters: {
      $and: [
        { createdAt: { $lte: new Date(endDate as string).toISOString().replace('T00:00:00.000Z', 'T23:59:59.999Z') } },
        { createdAt: { $gte: new Date(startDate as string).toISOString() } },
      ],
    },
  };

  const [expensesRes, productExpensesRes] = await Promise.all([
    expenseServices.getExpenses(reqQuery),
    productExpenseServices.getProductExpenses(reqQuery),
  ]);

  return {
    props: {
      expenses: expensesRes.data,
      productExpense: productExpensesRes.data,
    },
  };
};

const IncomeReportPage: NextPage<IncomeReportPageProps> = (props) => {
  const { expenses, productExpense } = props;
  const title = `${translations.incomeReport} | ${siteName}`;
  useCheckPermission('incomeReport');
  const uniqueDates = Array.from(
    new Set([
      ...expenses.map((expense) => expense.createdAt.split('T')[0]),
      ...productExpense.map((prodExpense) => prodExpense.createdAt.split('T')[0]),
    ]),
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <PageHeader
        title={translations.incomeReport}
        breadcrumbItems={[{ title: translations.incomeReport, url: '/reports/income' }]}
        showSearch={false}
        extraFilters={
          <>
            <div>
              <DatePicker />
            </div>
          </>
        }
      />
      <IncomeReportList uniqueDates={uniqueDates} expenses={expenses} productExpenses={productExpense} />
    </>
  );
};

export default IncomeReportPage;
