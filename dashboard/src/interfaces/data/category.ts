export interface ICategory {
	_id: string;
	title: string;
	description: string;
	productCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface IPagination {
	total: number;
	currentPage: number;
	totalPage: number;
}
