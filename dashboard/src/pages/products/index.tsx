import { AddProductDrawer, DeleteProductDrawer, EditProductDrawer } from '@/components/features';
import { ProductList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { NextPage } from 'next';
import { useState } from 'react';

const ProductsPage: NextPage = () => {
	const [drawerStates, setDrawerStates] = useState({
		add: false,
		edit: false,
		delete: false,
	});

	const showDrawer = (drawer: 'add' | 'edit' | 'delete') => {
		setDrawerStates((prev) => ({ ...prev, [drawer]: true }));
	};

	const closeDrawer = (drawer: 'add' | 'edit' | 'delete') => {
		setDrawerStates((prev) => ({ ...prev, [drawer]: false }));
	};

	return (
		<>
			<PageHeader
				breadcrumbItems={[{ title: translations.products, url: '/products' }]}
				title={translations.products}
				addBtnHandler={() => showDrawer('add')}
			/>
			<ProductList
				editHandler={() => showDrawer('edit')}
				deleteHandler={() => showDrawer('delete')}
			/>
			<Pagination />

			{/* Add Product Drawer */}
			<AddProductDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />

			{/* Edit Product Drawer */}
			<EditProductDrawer show={drawerStates.edit} closeHandler={() => closeDrawer('edit')} />

			{/* Delete Product Drawer */}
			<DeleteProductDrawer show={drawerStates.delete} closeHandler={() => closeDrawer('delete')} />
		</>
	);
};

export default ProductsPage;
