import { Form, Formik, FormikHelpers } from 'formik';
import { CloseIcon } from '@/assets/icons';
import { Input, MediumButton, Textarea } from '@/components/form';
import { FC } from 'react';
import { categoryCreateAndUpdateValidation } from '@/validations';

export interface CategoryInitialValuesType {
	title: string;
	description: string;
}

interface CategoryAddEditFormProps {
	closeHandler: () => void;
	initialValues: CategoryInitialValuesType;
	submitHandler: (
		values: CategoryInitialValuesType,
		formikHelpers: FormikHelpers<CategoryInitialValuesType>
	) => void;
	edit?: boolean;
}

export const CategoryAddEditForm: FC<CategoryAddEditFormProps> = ({
	closeHandler,
	initialValues,
	submitHandler,
	edit = false,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={submitHandler}
			validationSchema={categoryCreateAndUpdateValidation}
		>
			{({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
				<Form>
					<div className='space-y-4'>
						<Input
							label='Нэр'
							id='title'
							name='title'
							value={values.title}
							onChange={handleChange}
							onBlur={handleBlur}
							error={!!errors.title && touched.title}
							errorMsg={errors.title}
							placeholder='Ангилалын нэр'
						/>

						<Textarea
							label='Тайлбар'
							id='description'
							name='description'
							value={values.description}
							onChange={handleChange}
							onBlur={handleBlur}
							error={!!errors.description && touched.description}
							errorMsg={errors.description}
							placeholder='Энд ангилалын талаар дэлгэрэнгүй тайлбар бичих боломжтой'
							rows={5}
						/>

						<div className='bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute'>
							<MediumButton disabled={isSubmitting} type='submit' width='100%'>
								{edit ? 'Хадгалах' : 'Нэмэх'}
							</MediumButton>
							<MediumButton
								onClick={closeHandler}
								disabled={isSubmitting}
								type='button'
								width='100%'
								variant='white'
								Icon={CloseIcon}
							>
								Цуцлах
							</MediumButton>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};
