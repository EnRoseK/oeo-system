import { getFilteredFinanceIncomes } from '@/api/services';
import { DatePicker } from '@/components/form';
import { FinanceIncomeList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { IFinanceIncome, IPagination } from '@/interfaces';
import { isAxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { DateValueType } from 'react-tailwindcss-datepicker';

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
  const router = useRouter();

  const dateRangeChangeHandler = (values: DateValueType) => {
    if (values?.endDate && values.startDate) {
      router.push({
        query: { ...router.query, startDate: values.startDate.toString(), endDate: values.endDate.toString() },
      });
    } else {
      delete router.query.startDate;
      delete router.query.endDate;
      router.push({
        query: router.query,
      });
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={[{ title: translations.financeIncome, url: '/finances/income' }]}
        title={translations.financeIncome}
        showAddBtn={false}
        showSearch={false}
        extraFilters={
          <div>
            <DatePicker changeHandler={dateRangeChangeHandler} />
          </div>
        }
      />

      <FinanceIncomeList financeIncomes={financeIncomes} />
      <Pagination pagination={pagination} />
    </>
  );
};

export default FinanceIncomePage;
