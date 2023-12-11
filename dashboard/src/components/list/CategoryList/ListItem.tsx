import { TableRow, TableRowItem, TableRowItemDescription } from '@/components/Table';
import { ActionButtons } from '@/components/ui';
import { ICategory } from '@/interfaces';
import { FC } from 'react';

interface ListItemProps {
	category: ICategory;
	editHandler: () => void;
	deleteHandler: () => void;
}

export const ListItem: FC<ListItemProps> = ({ category, editHandler, deleteHandler }) => {
	return (
		<TableRow>
			<TableRowItem>1</TableRowItem>
			<TableRowItem>{category.title}</TableRowItem>
			<TableRowItemDescription>{category.description}</TableRowItemDescription>
			<TableRowItem>{category.productCount}</TableRowItem>
			<TableRowItem>{category.createdAt}</TableRowItem>
			<ActionButtons editHandler={editHandler} deleteHandler={deleteHandler} />
		</TableRow>
	);
};
