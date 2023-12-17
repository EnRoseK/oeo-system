import { getFilteredFinanceIncomes } from '@/api/services';
import { FinanceIncomeList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm } from '@/hooks';
import { IFinanceIncome, IPagination } from '@/interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

interface FinanceIncomePageProps {
  financeIncomes: IFinanceIncome[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<FinanceIncomePageProps> = async ({ query }) => {
  const { page = '1' } = query;

  const [financeIncomesRes] = await Promise.all([getFilteredFinanceIncomes(Number(page))]);

  return {
    props: {
      financeIncomes: financeIncomesRes.data,
      pagination: financeIncomesRes.pagination,
    },
  };
};

const FinanceIncomePage: NextPage<FinanceIncomePageProps> = ({ financeIncomes, pagination }) => {
  return (
    <>
      <PageHeader
        breadcrumbItems={[{ title: translations.financeIncome, url: '/finances/income' }]}
        title={translations.financeIncome}
        showAddBtn={false}
      />

      <FinanceIncomeList financeIncomes={financeIncomes} />
      <Pagination pagination={pagination} />
    </>
  );
};

export default FinanceIncomePage;
