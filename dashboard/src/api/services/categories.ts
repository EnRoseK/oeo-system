import { axiosInstance } from '@/libs';
import { GET_ALL_CATEGORIES, GET_CATEGORY_BY_ID } from '../endpoints';
import { ICategory } from '@/interfaces';

export const getAllCategories = async () => {
	return await axiosInstance.get<{ data: ICategory[] }>(GET_ALL_CATEGORIES).then((res) => res.data);
};

export const getCategoryById = async (id: string) => {
	return await axiosInstance
		.get<{ data: ICategory }>(GET_CATEGORY_BY_ID(id))
		.then((res) => res.data);
};
