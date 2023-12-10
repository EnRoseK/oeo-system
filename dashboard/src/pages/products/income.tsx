import { AddProductIncomeDrawer, EditProductIncomeDrawer } from '@/components/features';
import { ProductIncomeList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm } from '@/hooks';
import { NextPage } from 'next';
import { useState } from 'react';

const ProductIncomePage: NextPage = () => {
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
				breadcrumbItems={[
					{ title: translations.products, url: '/products' },
					{ title: translations.productIncome, url: '/products/income' },
				]}
				title={translations.productIncome}
				addBtnHandler={() => showDrawer('add')}
			/>

			<ProductIncomeList
				editHandler={() => showDrawer('edit')}
				deleteHandler={() => deleteProduct()}
			/>
			<Pagination />

			<AddProductIncomeDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
			<EditProductIncomeDrawer show={drawerStates.edit} closeHandler={() => closeDrawer('edit')} />
		</>
	);
};

export default ProductIncomePage;
