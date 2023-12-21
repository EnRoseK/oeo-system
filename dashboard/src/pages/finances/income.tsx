import { getFilteredFinanceIncomes } from '@/api/services';
import { DatePicker } from '@/components/form';
import { FinanceIncomeList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { IFinanceIncome, IPagination } from '@/interfaces';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';

interface FinanceIncomePageProps {
  financeIncomes: IFinanceIncome[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<FinanceIncomePageProps> = async ({ query, req }) => {
  try {
    const { page = '1', startDate, endDate } = query;

    const [financeIncomesRes] = await Promise.all([
      getFilteredFinanceIncomes(Number(page), startDate as string, endDate as string, req.cookies['connect.sid']),
    ]);

    return {
      props: {
        financeIncomes: financeIncomesRes.data,
        pagination: financeIncomesRes.pagination,
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

const FinanceIncomePage: NextPage<FinanceIncomePageProps> = ({ financeIncomes, pagination }) => {
  return (
    <>
      <PageHeader
        breadcrumbItems={[{ title: translations.financeIncome, url: '/finances/income' }]}
        title={translations.financeIncome}
        showAddBtn={false}
        showSearch={false}
        extraFilters={
          <div>
            <DatePicker />
          </div>
        }
      />

      <FinanceIncomeList financeIncomes={financeIncomes} />
      <Pagination pagination={pagination} />
    </>
  );
};

export default FinanceIncomePage;
