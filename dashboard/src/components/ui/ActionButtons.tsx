import React, { FC } from 'react';
import { SmallButton } from '../form';
import { DeleteIcon, UpdateIcon } from '@/assets/icons';

interface ActionButtonsProps {
	editHandler: () => void;
	deleteHandler: () => void;
}

export const ActionButtons: FC<ActionButtonsProps> = ({ editHandler, deleteHandler }) => {
	return (
		<td className='p-4 space-x-2 whitespace-nowrap'>
			<SmallButton onClick={editHandler} variant='primary' Icon={UpdateIcon}>
				Шинэчлэх
			</SmallButton>
			<SmallButton onClick={deleteHandler} variant='danger' Icon={DeleteIcon}>
				Устгах
			</SmallButton>
		</td>
	);
};
