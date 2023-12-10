import { Input, MediumButton } from '@/components/form';
import { PasswordRequirement } from '@/components/ui';
import { FC } from 'react';

export const PasswordForm: FC = () => {
	return (
		<div className='p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
			<h3 className='mb-4 text-xl font-semibold dark:text-white'>Нууц үг</h3>
			<form action='#'>
				<div className='grid grid-cols-6 gap-6'>
					<div className='col-span-6 sm:col-span-3'>
						<Input
							label='Одоогийн нууц үг'
							id='currentPassword'
							name='currentPassword'
							placeholder='••••••••'
						/>
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<Input
							label='Шинэ нууц үг'
							id='newPassword'
							name='newPassword'
							placeholder='••••••••'
						/>
						<PasswordRequirement />
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<Input
							label='Шинэ нууц үг давтах'
							id='newPasswordRe'
							name='newPasswordRe'
							placeholder='••••••••'
						/>
					</div>
					<div className='col-span-6 sm:col-full'>
						<MediumButton>Хадгалах</MediumButton>
					</div>
				</div>
			</form>
		</div>
	);
};
