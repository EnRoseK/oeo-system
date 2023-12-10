import { TableRow, TableRowItem, TableRowItemDescription } from '@/components/Table';
import { ActionButtons } from '@/components/ui';
import React, { FC, Fragment } from 'react';

const content = [
	{ text: 'Education Dashboard' },

	{
		text: 'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
		isDescription: true,
	},
	{ text: '100' },
];

interface ListItemProps {
	editHandler: () => void;
	deleteHandler: () => void;
}

export const ListItem: FC<ListItemProps> = ({ editHandler, deleteHandler }) => {
	return (
		<TableRow>
			{content.map((c, index) => {
				return (
					<Fragment key={index}>
						{c.isDescription ? (
							<TableRowItemDescription>{c.text}</TableRowItemDescription>
						) : (
							<TableRowItem>{c.text}</TableRowItem>
						)}
					</Fragment>
				);
			})}

			<ActionButtons editHandler={editHandler} deleteHandler={deleteHandler} />
		</TableRow>
	);
};
