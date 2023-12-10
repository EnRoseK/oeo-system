import { AddUserDrawer, EditUserDrawer } from '@/components/features';
import { UserList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { useConfirm } from '@/hooks';
import { NextPage } from 'next';
import { useState } from 'react';

const UsersPage: NextPage = () => {
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
				breadcrumbItems={[{ title: translations.users, url: '/users' }]}
				title={translations.users}
				addBtnHandler={() => showDrawer('add')}
			/>

			<UserList editHandler={() => showDrawer('edit')} deleteHandler={() => deleteProduct()} />
			<Pagination />

			<AddUserDrawer show={drawerStates.add} closeHandler={() => closeDrawer('add')} />
			<EditUserDrawer show={drawerStates.edit} closeHandler={() => closeDrawer('edit')} />
		</>
	);
};

export default UsersPage;
