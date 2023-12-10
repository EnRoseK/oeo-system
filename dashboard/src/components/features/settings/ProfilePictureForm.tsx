import { UploadIcon } from '@/assets/icons';
import { SmallButton } from '@/components/form';
import Image from 'next/image';
import { FC } from 'react';

export const ProfilePictureForm: FC = () => {
	return (
		<div className='p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
			<div className='items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4'>
				<Image
					className='mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0'
					src='https://flowbite-admin-dashboard.vercel.app/images/users/bonnie-green-2x.png'
					alt='Jese picture'
					width={112}
					height={112}
				/>
				<div>
					<h3 className='mb-1 text-xl font-bold text-gray-900 dark:text-white'>Зураг</h3>
					<div className='mb-4 text-sm text-gray-500 dark:text-gray-400'>
						JPG, GIF or PNG. Max size of 800K
					</div>
					<div className='flex items-center space-x-4'>
						<SmallButton variant='primary' Icon={UploadIcon}>
							Зураг оруулах
						</SmallButton>
						<SmallButton variant='white'>Устгах</SmallButton>
					</div>
				</div>
			</div>
		</div>
	);
};
