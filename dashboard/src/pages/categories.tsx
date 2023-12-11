import { getAllCategories } from '@/api/services';
import { AddCategoryDrawer, EditCategoryDrawer } from '@/components/features';
import { CategoryList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm } from '@/hooks';
import { ICategory } from '@/interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

interface CategoriesPageProps {
	categories: ICategory[];
}

export const getServerSideProps: GetServerSideProps<CategoriesPageProps> = async () => {
	const categoriesRes = await getAllCategories();

	return {
		props: {
			categories: categoriesRes.data,
		},
	};
};

const CategoriesPage: NextPage<CategoriesPageProps> = ({ categories }) => {
	const { isConfirmed } = useConfirm();
	const [drawerStates, setDrawerStates] = useState({
		add: false,
		edit: false,
	});

	const showDrawer = (drawer: 'add' | 'edit') => {
		setDrawerStates((prev) => ({ ...prev, [drawer]: true }));
	};

	const closeDrawer = (drawer: 'add' | 'edit') => {
		setDrawerStates((prev) => ({ ...prev, [drawer]: false }));
	};

	const deleteCategory = async () => {
		try {
			const confirmed = await isConfirmed('Та энэ ангилалыг устгахдаа итгэлтэй байна уу?');
		} catch (error) {}
	};

	return (
		<>
			<PageHeader
				breadcrumbItems={[{ title: translations.categories, url: '/categories' }]}
				title={translations.categories}
				addBtnHandler={() => showDrawer('add')}
			/>
			<CategoryList
				categories={categories}
				editHandler={() => showDrawer('edit')}
				deleteHandler={() => deleteCategory()}
			/>
			<Pagination />

			<AddCategoryDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />

			<EditCategoryDrawer show={drawerStates.edit} closeHandler={() => closeDrawer('edit')} />
		</>
	);
};

export default CategoriesPage;
