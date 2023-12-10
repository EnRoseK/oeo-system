import { Input, MediumButton } from '@/components/form';
import { FC } from 'react';

export const LoginForm: FC = () => {
	return (
		<div className='w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800'>
			<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Нэвтрэх</h2>
			<form className='mt-8 space-y-6' action='#'>
				<Input label='И-мэйл' id='email' name='email' placeholder='example@example.com' />
				<Input label='Нууц үг' id='password' name='password' placeholder='••••••••' />

				<MediumButton>Нэвтрэх</MediumButton>
			</form>
		</div>
	);
};
