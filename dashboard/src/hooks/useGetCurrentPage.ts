import { useRouter } from 'next/router';

export const useGetCurrentPage = () => {
	const router = useRouter();

	const currentPage = Number(router.query.page) || 1;

	return currentPage;
};
