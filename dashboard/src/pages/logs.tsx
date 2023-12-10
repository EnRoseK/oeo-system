import { LogList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { NextPage } from 'next';
import React from 'react';

const LogsPage: NextPage = () => {
	return (
		<>
			<PageHeader
				breadcrumbItems={[{ title: translations.log, url: '/logs' }]}
				title={translations.log}
				showAddBtn={false}
			/>

			<LogList />
			<Pagination />
		</>
	);
};

export default LogsPage;
