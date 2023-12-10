import { Drawer } from '@/components/ui';
import { FC } from 'react';
import { ProductAddEditForm } from './ProductAddEditForm';
import { CloseIcon } from '@/assets/icons';

interface AddProductDrawerProps {
	show: boolean;
	closeHandler: () => void;
}

export const AddProductDrawer: FC<AddProductDrawerProps> = ({ show, closeHandler }) => {
	return (
		<Drawer show={show} closeHandler={closeHandler}>
			<h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
				Урвалж нэмэх
			</h5>
			<button
				onClick={closeHandler}
				type='button'
				className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
			>
				<CloseIcon width={20} height={20} />
			</button>

			<ProductAddEditForm />
		</Drawer>
	);
};
