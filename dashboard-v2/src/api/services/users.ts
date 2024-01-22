import { IRole, IUser, RequestQuery, ServiceQuery } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { CREATE_USER, DELETE_USER, GET_ROLES, GET_USERS, UPDATE_USER } from '../endpoints';

const getUsers = async ({ filters }: ServiceQuery) => {
  const paramaters: RequestQuery = {
    sort: 'createdAt:desc',
    populate: '*',
  };

  if (filters) {
    paramaters.filters = filters;
  }

  return await axiosInstance.get<IUser[]>(convertApiUrl(GET_USERS, paramaters)).then((res) => res.data);
};

const getRoles = async () => {
  const paramaters: RequestQuery = {
    sort: 'createdAt:desc',
  };

  return await axiosInstance.get<{ roles: IRole[] }>(convertApiUrl(GET_ROLES, paramaters)).then((res) => res.data);
};

const createUser = async (data: any) => {
  return await axiosInstance.post(CREATE_USER, data).then((res) => res.data);
};

const updateUser = async (id: number, data: any) => {
  return await axiosInstance.put(UPDATE_USER(id), data).then((res) => res.data);
};

const deleteUser = async (id: number) => {
  return await axiosInstance.delete(DELETE_USER(id));
};

export const userServices = { getUsers, getRoles, createUser, updateUser, deleteUser };
