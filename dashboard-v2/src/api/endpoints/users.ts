export const GET_USERS = '/users';
export const GET_ROLES = '/users-permissions/roles';
export const CREATE_USER = '/auth/local/register';
export const UPDATE_USER = (id: number) => `/users/${id}`;
export const DELETE_USER = (id: number) => `/users/${id}`;
