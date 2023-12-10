import { AddProductDrawer, EditProductDrawer } from '@/components/features';
import { ProductList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm } from '@/hooks';
import { NextPage } from 'next';
import { useState } from 'react';

const ProductsPage: NextPage = () => {
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

	const deleteProduct = async () => {
		try {
			const confirmed = await isConfirmed('Та энэ урвалжийг устгахдаа итгэлтэй байна уу?');
		} catch (error) {}
	};

	return (
		<>
			<PageHeader
				breadcrumbItems={[{ title: translations.products, url: '/products' }]}
				title={translations.products}
				addBtnHandler={() => showDrawer('add')}
			/>
			<ProductList editHandler={() => showDrawer('edit')} deleteHandler={() => deleteProduct()} />
			<Pagination />

			{/* Add Product Drawer */}
			<AddProductDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />

			{/* Edit Product Drawer */}
			<EditProductDrawer show={drawerStates.edit} closeHandler={() => closeDrawer('edit')} />
		</>
	);
};

export default ProductsPage;
