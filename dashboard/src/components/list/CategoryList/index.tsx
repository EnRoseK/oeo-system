import React, { FC } from 'react';
import { ListItem } from './ListItem';
import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { ICategory } from '@/interfaces';
import { EmptyPage } from '@/components/ui';
import { useGetCurrentPage } from '@/hooks';
import { PAGE_SIZE } from '@/constants';

const TABLE_HEADS = ['#', 'Нэр', 'Тайлбар', 'Урвалжийн тоо', 'Үүссэн огноо', 'Үйлдэл'];

interface CategoryListProps {
	categories: ICategory[];
	editHandler: (category: ICategory) => void;
	deleteHandler: (id: string) => void;
}

export const CategoryList: FC<CategoryListProps> = ({ categories, editHandler, deleteHandler }) => {
	const currentPage = useGetCurrentPage();

	return (
		<div className='flex flex-col'>
			<div className='overflow-x-auto'>
				<div className='inline-block min-w-full align-middle'>
					<div className='overflow-hidden shadow'>
						<Table>
							<TableHead>
								{TABLE_HEADS.map((head, index) => {
									return <TableHeadItem key={index}>{head}</TableHeadItem>;
								})}
							</TableHead>
							<TableBody>
								{categories.map((category, index) => {
									return (
										<ListItem
											number={(currentPage - 1) * PAGE_SIZE + index + 1}
											category={category}
											editHandler={editHandler}
											deleteHandler={deleteHandler}
											key={category._id}
										/>
									);
								})}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
};
