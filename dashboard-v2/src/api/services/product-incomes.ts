import { IPagination, IProductIncome, RequestQuery, ServiceQuery } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { CREATE_PRODUCT_INCOME, DELETE_PRODUCT_INCOME, GET_PRODUCT_INCOMES } from '../endpoints';

const getProductIncomes = async ({ page, pageSize, filters, limit, jwt }: ServiceQuery) => {
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
    .get<{ data: IProductIncome[]; meta: { pagination: IPagination } }>(
      convertApiUrl(GET_PRODUCT_INCOMES, paramaters),
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    )
    .then((res) => res.data);
};

const createProductIncome = async (data: any, jwt: string) => {
  return await axiosInstance
    .post(CREATE_PRODUCT_INCOME, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const deleteProductIncome = async (id: number, jwt: string) => {
  return await axiosInstance
    .delete(DELETE_PRODUCT_INCOME(id), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.status);
};

export const productIncomeServices = { getProductIncomes, createProductIncome, deleteProductIncome };
