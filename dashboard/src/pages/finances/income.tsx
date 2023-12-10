import { AddFinanceIncomeDrawer, EditFinanceIncomeDrawer } from '@/components/features';
import { FinanceIncomeList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm } from '@/hooks';
import { NextPage } from 'next';
import { useState } from 'react';

const FinanceIncomePage: NextPage = () => {
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
				breadcrumbItems={[{ title: translations.financeIncome, url: '/finances/income' }]}
				title={translations.financeIncome}
				addBtnHandler={() => showDrawer('add')}
			/>

			<FinanceIncomeList
				editHandler={() => showDrawer('edit')}
				deleteHandler={() => deleteProduct()}
			/>
			<Pagination />

			<AddFinanceIncomeDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
			<EditFinanceIncomeDrawer show={drawerStates.edit} closeHandler={() => closeDrawer('edit')} />
		</>
	);
};

export default FinanceIncomePage;
