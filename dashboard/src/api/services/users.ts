import { axiosInstance } from '@/libs';
import {
  CREATE_USER,
  GET_FILTERED_USERS,
  REMOVE_USER,
  UPDATE_USER_INFO,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PERMISSION,
} from '../endpoints';
import { IUser } from '@/interfaces/data/user';
import { IPagination } from '@/interfaces';

export const getFilteredUsers = async (page?: number, cookie?: string) => {
  const searchParams = new URLSearchParams();

  if (page) {
    searchParams.set('page', page.toString());
  }

  return await axiosInstance
    .get<{ data: IUser[]; pagination: IPagination }>(GET_FILTERED_USERS(searchParams.toString()), {
      headers: {
        Cookie: `connect.sid=${cookie}`,
      },
    })
    .then((res) => res.data);
};

export const createUser = async (data: unknown) => {
  return await axiosInstance.post<{ data: IUser }>(CREATE_USER, data).then((res) => res.data);
};

export const removeUser = async (id: string) => {
  return await axiosInstance.delete(REMOVE_USER(id)).then((res) => res.status);
};

export const updateUserInfo = async (data: unknown) => {
  return await axiosInstance.patch<{ data: IUser }>(UPDATE_USER_INFO, data).then((res) => res.data);
};

export const updateUserPassword = async (data: unknown) => {
  return await axiosInstance.patch<{ message: string }>(UPDATE_USER_PASSWORD, data).then((res) => res.data);
};

export const updateUserPermission = async (id: string, data: unknown) => {
  return await axiosInstance
    .patch<{ message: string }>(UPDATE_USER_PERMISSION(id), { permission: data })
    .then((res) => res.data);
};
