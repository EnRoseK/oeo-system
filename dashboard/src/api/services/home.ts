import { axiosInstance } from '@/libs';
import { GET_HOME_STATS } from '../endpoints';
import { IHomeStat } from '@/interfaces';

export const getHomeStats = async (cookie?: string) => {
  return await axiosInstance
    .get<{ data: IHomeStat[] }>(GET_HOME_STATS, {
      headers: {
        Cookie: `connect.sid=${cookie}`,
      },
    })
    .then((res) => res.data);
};
