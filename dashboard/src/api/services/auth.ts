import { axiosInstance } from '@/libs';
import { GET_CURRENT_USER, LOGIN, LOGOUT } from '../endpoints';
import { IUser } from '@/interfaces/data/user';

export const login = async (data: unknown) => {
  return await axiosInstance.post(LOGIN, data).then((res) => res.data);
};

export const logout = async () => {
  return await axiosInstance.post(LOGOUT).then((res) => res.data);
};

export const getCurrentUser = async () => {
  return await axiosInstance.get<{ data: IUser }>(GET_CURRENT_USER).then((res) => res.data);
};
