import { IUser, RequestQuery, ServiceQuery } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_USERS } from '../endpoints';

const getUsers = async ({ filters }: ServiceQuery) => {
  const paramaters: RequestQuery = {
    sort: 'createdAt:desc',
  };

  if (filters) {
    paramaters.filters = filters;
  }

  return await axiosInstance.get<IUser[]>(convertApiUrl(GET_USERS, paramaters)).then((res) => res.data);
};

export const userServices = { getUsers };
