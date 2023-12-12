import { Drawer } from '@/components/ui';
import { FC } from 'react';
import { CategoryAddEditForm, CategoryInitialValuesType } from './CategoryAddEditForm';
import { CloseIcon } from '@/assets/icons';
import { FormikHelpers } from 'formik';
import { createCategory } from '@/api/services';
import { toast } from 'react-toastify';
import { errorHandler } from '@/utils';
import { translations } from '@/constants';
import { useRefreshData } from '@/hooks';

interface AddCategoryDrawerProps {
	show: boolean;
	closeHandler: () => void;
}

const initialValues = {
	title: '',
	description: '',
};

export const AddCategoryDrawer: FC<AddCategoryDrawerProps> = ({ show, closeHandler }) => {
	const refreshData = useRefreshData();

	const onSubmit = async (
		values: CategoryInitialValuesType,
		helpers: FormikHelpers<CategoryInitialValuesType>
	) => {
		try {
			await createCategory(values);

			toast.success('Ангилал амжилттай нэмэгдлээ');
			closeHandler();
			helpers.resetForm();
			refreshData();
		} catch (error) {
			errorHandler(error);
		}
	};

	return (
		<Drawer show={show} closeHandler={closeHandler}>
			<h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
				{translations.categories} нэмэх
			</h5>
			<button
				onClick={closeHandler}
				type='button'
				className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
			>
				<CloseIcon width={20} height={20} />
			</button>

			<CategoryAddEditForm
				initialValues={initialValues}
				closeHandler={closeHandler}
				submitHandler={onSubmit}
			/>
		</Drawer>
	);
};
