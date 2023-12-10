import { Table, TableBody, TableHead, TableHeadItem } from '@/components/Table';
import { FC } from 'react';
import { ListItem } from './ListItem';

const TABLE_HEADS = ['Нэр', 'Ангилал', 'Тайлбар', 'Үлдэгдэл', 'Үйлдэл'];

interface ProductExpenseListProps {
	editHandler: () => void;
	deleteHandler: () => void;
}

export const ProductExpenseList: FC<ProductExpenseListProps> = ({ editHandler, deleteHandler }) => {
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
