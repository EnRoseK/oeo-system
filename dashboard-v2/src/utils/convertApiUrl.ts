import { RequestQuery } from '@/interfaces';
import qs from 'qs';

export const convertApiUrl = (url: string, query: RequestQuery) => {
  return url + '?' + qs.stringify(query);
};
