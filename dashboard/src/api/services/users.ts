import { axiosInstance } from '@/libs';
import { CREATE_USER, GET_FILTERED_USERS, REMOVE_USER } from '../endpoints';
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
