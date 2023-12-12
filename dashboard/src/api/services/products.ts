import { axiosInstance } from '@/libs';
import { CREATE_PRODUCT, GET_ALL_PRODUCTS, GET_FILTERED_PRODUCTS, REMOVE_PRODUCT, UPDATE_PRODUCT } from '../endpoints';
import { IPagination, IProduct } from '@/interfaces';

export const getAllProducts = async () => {
  return await axiosInstance.get<{ data: IProduct[] }>(GET_ALL_PRODUCTS).then((res) => res.data);
};

export const getFilteredProducts = async (page: number, search: string) => {
  const searchParams = new URLSearchParams();
  if (page) {
    searchParams.set('page', page.toString());
  }
  if (search) {
    searchParams.set('q', search);
  }

  return await axiosInstance
    .get<{ data: IProduct[]; pagination: IPagination }>(GET_FILTERED_PRODUCTS(searchParams.toString()))
    .then((res) => res.data);
};

export const createProduct = async (data: unknown) => {
  return await axiosInstance.post<{ data: IProduct }>(CREATE_PRODUCT, data).then((res) => res.data);
};

export const updateProduct = async (id: string, data: unknown) => {
  return await axiosInstance.patch<{ data: IProduct }>(UPDATE_PRODUCT(id), data).then((res) => res.data);
};

export const removeProduct = async (id: string) => {
  return await axiosInstance.delete(REMOVE_PRODUCT(id)).then((res) => res.status);
};
