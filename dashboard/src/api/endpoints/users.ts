export const GET_FILTERED_USERS = (params: string) => `/users?${params}`;
export const CREATE_USER = '/users';
export const REMOVE_USER = (id: string) => `/users/${id}`;