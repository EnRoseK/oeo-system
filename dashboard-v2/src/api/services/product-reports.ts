import { IProductReport, RequestQuery, ServiceQuery } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { convertApiUrl } from '@/utils';
import { GET_PRODUCT_REPORTS } from '../endpoints';

const getProductReports = async ({ filters }: ServiceQuery) => {
  const paramaters: RequestQuery = {
    filters,
    pagination: {
      limit: -1,
    },
    sort: 'createdAt:desc',
    populate: '*',
  };

  return await axiosInstance
    .get<{ data: IProductReport[] }>(convertApiUrl(GET_PRODUCT_REPORTS, paramaters))
    .then((res) => res.data);
};

export const productReportServices = { getProductReports };
