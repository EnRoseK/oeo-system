export const GET_FILTERED_USERS = (params: string) => `/users?${params}`;
export const CREATE_USER = '/users';
export const REMOVE_USER = (id: string) => `/users/${id}`;
export const UPDATE_USER_INFO = '/users/info';
export const UPDATE_USER_PASSWORD = '/users/password';
export const UPDATE_USER_PERMISSION = (id: string) => `/users/${id}`;
