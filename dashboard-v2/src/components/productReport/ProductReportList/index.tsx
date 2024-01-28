import { ResultNotFound, Table, TableBody, TableHead, TableHeadItem } from '@/components';
import { FC } from 'react';
import { ListItem } from './ListItem';
import { useRouter } from 'next/router';
import { IProduct, IProductExpense, IProductIncome } from '@/interfaces';

const TABLE_HEADS = ['Урвалжийн нэр', 'Эхний үлдэгдэл', 'Орлогодсон тоо', 'Зарлагадсан тоо', 'Эцсийн үлдэгдэл'];

interface ProductReportListProps {
  products: IProduct[];
  productExpenses: IProductExpense[];
  productIncomes: IProductIncome[];
}

export const ProductReportList: FC<ProductReportListProps> = (props) => {
  const { products, productIncomes, productExpenses } = props;
  const router = useRouter();
  const { startDate, endDate } = router.query;

  const showList = startDate && endDate;
  const uniqueProductIds = Array.from(
    new Set([
      ...productIncomes
        .filter((income) => income.createdAt.split('T')[0] >= startDate! && income.createdAt.split('T')[0] <= endDate!)
        .map((income) => income.product.id),
      ...productExpenses
        .filter(
          (expense) => expense.createdAt.split('T')[0] >= startDate! && expense.createdAt.split('T')[0] <= endDate!,
        )
        .map((expense) => expense.product.id),
    ]),
  );

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto'>
        <div className='inline-block min-w-full align-middle'>
          <div className='overflow-hidden shadow'>
            <Table>
              <TableHead>
                {TABLE_HEADS.map((head, index) => {
                  return <TableHeadItem key={index}>{head}</TableHeadItem>;
                })}
              </TableHead>
              {showList && (
                <TableBody>
                  {products
                    .filter((prod) => uniqueProductIds.includes(prod.id))
                    .map((product) => {
                      const currentProductIncomes = productIncomes.filter((income) => income.product.id === product.id);
                      const currentProductExpenses = productExpenses.filter(
                        (expense) => expense.product.id === product.id,
                      );

                      return (
                        <ListItem
                          key={product.id}
                          product={product}
                          productExpenses={currentProductExpenses}
                          productIncomes={currentProductIncomes}
                        />
                      );
                    })}
                </TableBody>
              )}
              {!showList && <ResultNotFound />}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
