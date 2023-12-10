import { Input, MediumButton } from '@/components/form';
import { FC } from 'react';

export const GeneralInformationForm: FC = () => {
	return (
		<div className='p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
			<h3 className='mb-4 text-xl font-semibold dark:text-white'>Ерөнхий мэдээлэл</h3>
			<form action='#'>
				<div className='grid grid-cols-6 gap-6'>
					<div className='col-span-6 sm:col-span-3'>
						<Input label='Нэр' id='firstName' name='firstName' />
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<Input label='Овог' id='lastName' name='lastName' />
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<Input label='И-мэйл' id='email' name='email' />
					</div>
					<div className='col-span-6 sm:col-full'>
						<MediumButton variant='primary'>Хадгалах</MediumButton>
					</div>
				</div>
			</form>
		</div>
	);
};
