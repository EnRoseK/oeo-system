import { AddFinanceExpenseDrawer, EditFinanceExpenseDrawer } from '@/components/features';
import { FinanceExpenseList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm } from '@/hooks';
import { NextPage } from 'next';
import { useState } from 'react';

const FinanceExpensePage: NextPage = () => {
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
				breadcrumbItems={[{ title: translations.financeExpense, url: '/finances/expense' }]}
				title={translations.financeExpense}
				addBtnHandler={() => showDrawer('add')}
			/>

			<FinanceExpenseList
				editHandler={() => showDrawer('edit')}
				deleteHandler={() => deleteProduct()}
			/>
			<Pagination />

			<AddFinanceExpenseDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
			<EditFinanceExpenseDrawer show={drawerStates.edit} closeHandler={() => closeDrawer('edit')} />
		</>
	);
};

export default FinanceExpensePage;
