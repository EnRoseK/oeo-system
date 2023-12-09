import React, { FC } from 'react';
import { SmallButton } from '../form';
import { DeleteIcon, UpdateIcon } from '@/assets/icons';

export const ActionButtons: FC = () => {
	return (
		<td className='p-4 space-x-2 whitespace-nowrap'>
			<SmallButton variant='primary' Icon={UpdateIcon}>
				Шинэчлэх
			</SmallButton>
			<SmallButton variant='danger' Icon={DeleteIcon}>
				Устгах
			</SmallButton>
		</td>
	);
};
