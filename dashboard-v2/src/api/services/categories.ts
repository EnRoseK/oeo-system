import { ICategory, IPagination, RequestQuery, ServiceQuery } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from '../endpoints';

const getCategories = async ({ page, pageSize, limit, filters }: ServiceQuery) => {
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
    .get<{ data: ICategory[]; meta: { pagination: IPagination } }>(convertApiUrl(GET_CATEGORIES, paramaters))
    .then((res) => res.data);
};

const createCategory = async (data: any) => {
  return await axiosInstance.post(CREATE_CATEGORY, data).then((res) => res.data);
};

const updateCategory = async (id: number, data: any) => {
  return await axiosInstance.put(UPDATE_CATEGORY(id), data).then((res) => res.data);
};

const deleteCategory = async (id: number) => {
  return await axiosInstance.delete(DELETE_CATEGORY(id)).then((res) => res.status);
};

export const categoryServices = { getCategories, createCategory, updateCategory, deleteCategory };
