import { axiosInstance } from '@/libs';
import { ME, SIGN_IN } from '../endpoints';
import { IUser } from '@/interfaces';

const signIn = async ({ email, password }: { email: string; password: string }) => {
  return await axiosInstance
    .post<{ jwt: string; user: IUser }>(SIGN_IN, { identifier: email, password })
    .then((res) => res.data);
};

const me = async (jwt: string) => {
  return await axiosInstance
    .get<IUser>(ME, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
};

export const authServices = { signIn, me };
