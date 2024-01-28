import { ICategory, IPagination, RequestQuery, ServiceQuery } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from '../endpoints';

const getCategories = async ({ page, pageSize, limit, filters, jwt }: ServiceQuery) => {
  const paramaters: RequestQuery = {
    sort: 'createdAt:desc',
  };

  if (page && pageSize && !limit) {
    paramaters.pagination = {};
    paramaters.pagination.page = page;
    paramaters.pagination.pageSize = pageSize;
  }

  if (!page && !pageSize && limit) {
    paramaters.pagination = {};
    paramaters.pagination.limit = limit;
  }

  if (filters) {
    paramaters.filters = filters;
  }

  return await axiosInstance
    .get<{ data: ICategory[]; meta: { pagination: IPagination } }>(convertApiUrl(GET_CATEGORIES, paramaters), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const createCategory = async (data: any, jwt: string) => {
  return await axiosInstance
    .post(CREATE_CATEGORY, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const updateCategory = async (id: number, data: any, jwt: string) => {
  return await axiosInstance
    .put(UPDATE_CATEGORY(id), data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const deleteCategory = async (id: number, jwt: string) => {
  return await axiosInstance
    .delete(DELETE_CATEGORY(id), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.status);
};

export const categoryServices = { getCategories, createCategory, updateCategory, deleteCategory };
