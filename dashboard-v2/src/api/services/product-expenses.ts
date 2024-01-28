import { IPagination, IProductExpense, RequestQuery, ServiceQuery } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { CREATE_PRODUCT_EXPENSE, DELETE_PRODUCT_EXPENSE, GET_PRODUCT_EXPENSES } from '../endpoints';

const getProductExpenses = async ({ page, pageSize, filters, limit, jwt }: ServiceQuery) => {
  const paramaters: RequestQuery = {
    sort: 'createdAt:desc',
    populate: 'product',
  };

  if (page && pageSize && !limit) {
    paramaters.pagination = {
      page,
      pageSize,
    };
  }

  if (!page && !pageSize && limit) {
    paramaters.pagination = {
      limit,
    };
  }

  if (filters) {
    paramaters.filters = filters;
  }

  return await axiosInstance
    .get<{
      data: IProductExpense[];
      meta: { pagination: IPagination };
    }>(convertApiUrl(GET_PRODUCT_EXPENSES, paramaters), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const createProductExpense = async (data: any, jwt: string) => {
  return await axiosInstance
    .post(CREATE_PRODUCT_EXPENSE, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const deleteProductExpense = async (id: number, jwt: string) => {
  return await axiosInstance
    .delete(DELETE_PRODUCT_EXPENSE(id), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.status);
};

export const productExpenseServices = { getProductExpenses, createProductExpense, deleteProductExpense };
