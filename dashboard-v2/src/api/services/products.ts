import { IPagination, IProduct, RequestQuery, ServiceQuery } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT } from '../endpoints';

const getProducts = async ({ page, pageSize, limit, filters }: ServiceQuery) => {
  const paramaters: RequestQuery = {
    sort: 'createdAt:desc',
    populate: 'product_category',
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
    .get<{ data: IProduct[]; meta: { pagination: IPagination } }>(convertApiUrl(GET_PRODUCTS, paramaters))
    .then((res) => res.data);
};

const createProduct = async (data: any) => {
  return await axiosInstance.post(CREATE_PRODUCT, data).then((res) => res.data);
};

const updateProduct = async (id: number, data: any) => {
  return await axiosInstance.put(UPDATE_PRODUCT(id), data).then((res) => res.data);
};

const deleteProduct = async (id: number) => {
  return await axiosInstance.delete(DELETE_PRODUCT(id)).then((res) => res.status);
};

export const productServices = { getProducts, createProduct, updateProduct, deleteProduct };
