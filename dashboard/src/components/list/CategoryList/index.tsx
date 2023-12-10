import React, { FC } from 'react';
import { ListItem } from './ListItem';
import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';

const TABLE_HEADS = ['Нэр', 'Тайлбар', 'Урвалжийн тоо', 'Үйлдэл'];

interface CategoryListProps {
	editHandler: () => void;
	deleteHandler: () => void;
}

export const CategoryList: FC<CategoryListProps> = ({ editHandler, deleteHandler }) => {
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
								{Array.from(Array(5)).map((_, ind) => {
									return (
										<ListItem editHandler={editHandler} deleteHandler={deleteHandler} key={ind} />
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
