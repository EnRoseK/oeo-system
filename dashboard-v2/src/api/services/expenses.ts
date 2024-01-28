import { IExpense, IPagination, RequestQuery, ServiceQuery } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { CREATE_EXPENSE, DELETE_EXPENSE, GET_EXPENSES, UPDATE_EXPENSE } from '../endpoints';

const getExpenses = async ({ page, pageSize, limit, filters, jwt }: ServiceQuery) => {
  const paramaters: RequestQuery = {
    sort: 'createdAt:desc',
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
    .get<{ data: IExpense[]; meta: { pagination: IPagination } }>(convertApiUrl(GET_EXPENSES, paramaters), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const createExpense = async (data: any, jwt: string) => {
  return await axiosInstance
    .post(CREATE_EXPENSE, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const updateExpense = async (id: number, data: any, jwt: string) => {
  return await axiosInstance
    .put(UPDATE_EXPENSE(id), data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const deleteExpense = async (id: number, jwt: string) => {
  return await axiosInstance
    .delete(DELETE_EXPENSE(id), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.status);
};

export const expenseServices = { getExpenses, createExpense, updateExpense, deleteExpense };
