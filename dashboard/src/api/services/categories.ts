import { axiosInstance } from '@/libs';
import {
	CREATE_CATEGORY,
	DELETE_CATEGORY,
	GET_ALL_CATEGORIES,
	GET_CATEGORY_BY_ID,
	UPDATE_CATEGORY,
} from '../endpoints';
import { ICategory, IPagination } from '@/interfaces';

export const getAllCategories = async (page: number, search: string) => {
	const searchParams = new URLSearchParams();
	if (page) {
		searchParams.set('page', page.toString());
	}
	if (search) {
		searchParams.set('q', search);
	}

	return await axiosInstance
		.get<{ data: ICategory[]; pagination: IPagination }>(
			GET_ALL_CATEGORIES(searchParams.toString())
		)
		.then((res) => res.data);
};

export const getCategoryById = async (id: string) => {
	return await axiosInstance
		.get<{ data: ICategory }>(GET_CATEGORY_BY_ID(id))
		.then((res) => res.data);
};

export const createCategory = async (data: { title: string; description?: string }) => {
	return await axiosInstance
		.post<{ data: ICategory }>(CREATE_CATEGORY, data)
		.then((res) => res.data);
};

export const updateCategory = async (id: string, data: { title: string; description?: string }) => {
	return await axiosInstance
		.patch<{ data: ICategory }>(UPDATE_CATEGORY(id), data)
		.then((res) => res.data);
};

export const removeCategory = async (id: string) => {
	return await axiosInstance.delete(DELETE_CATEGORY(id)).then((res) => res.status);
};
