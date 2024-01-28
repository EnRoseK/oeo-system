import { IUser, RequestQuery, ServiceQuery } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../endpoints';

const getUsers = async ({ filters, jwt }: ServiceQuery) => {
  const paramaters: RequestQuery = {
    sort: 'createdAt:desc',
    populate: '*',
  };

  if (filters) {
    paramaters.filters = filters;
  }

  return await axiosInstance
    .get<IUser[]>(convertApiUrl(GET_USERS, paramaters), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const createUser = async (data: any, jwt: string) => {
  return await axiosInstance
    .post(CREATE_USER, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const updateUser = async (id: number, data: any, jwt: string) => {
  return await axiosInstance
    .put<IUser>(UPDATE_USER(id), data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

const deleteUser = async (id: number, jwt: string) => {
  return await axiosInstance.delete(DELETE_USER(id), {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const userServices = { getUsers, createUser, updateUser, deleteUser };
