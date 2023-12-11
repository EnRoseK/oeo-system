import React, { FC } from 'react';
import { ListItem } from './ListItem';
import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { ICategory } from '@/interfaces';

const TABLE_HEADS = ['#', 'Нэр', 'Тайлбар', 'Урвалжийн тоо', 'Үүссэн огноо', 'Үйлдэл'];

interface CategoryListProps {
	categories: ICategory[];
	editHandler: () => void;
	deleteHandler: () => void;
}

export const CategoryList: FC<CategoryListProps> = ({ categories, editHandler, deleteHandler }) => {
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
								{categories.map((category) => {
									return (
										<ListItem
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
