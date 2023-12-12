export const GET_ALL_PRODUCTS = '/products/all';
export const GET_FILTERED_PRODUCTS = (params: string) => `/products?${params}`;
export const CREATE_PRODUCT = '/products';
export const UPDATE_PRODUCT = (id: string) => `/products/${id}`;
export const REMOVE_PRODUCT = (id: string) => `/products/${id}`;
