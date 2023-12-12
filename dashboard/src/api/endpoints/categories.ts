export const GET_ALL_CATEGORIES = (params: string) => `/categories?${params}`;
export const GET_CATEGORY_BY_ID = (id: string) => `/categories/${id}`;
export const CREATE_CATEGORY = '/categories';
export const UPDATE_CATEGORY = (id: string) => `/categories/${id}`;
export const DELETE_CATEGORY = (id: string) => `/categories/${id}`;
