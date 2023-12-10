import { NextPage } from 'next';
import NotFoundImage from '@/assets/images/404.svg';
import Image from 'next/image';
import { PrevIcon } from '@/assets/icons';
import { MediumButton } from '@/components/form';
import { useRouter } from 'next/router';

const NotFoundPage: NextPage = () => {
	const router = useRouter();

	const navigateHome = () => {
		router.replace('/');
	};

	return (
		<div className='flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900'>
			<div className='block md:max-w-lg'>
				<Image src={NotFoundImage} alt='404' />
			</div>
			<div className='text-center xl:max-w-4xl'>
				<h1 className='mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white'>
					Хуудас олдсонгүй
				</h1>
				<p className='mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400'>
					Таны хайсан хуудас олдсонгүй.
				</p>
				<MediumButton onClick={navigateHome} variant='primary' Icon={PrevIcon}>
					Хянах самбар
				</MediumButton>
			</div>
		</div>
	);
};

export default NotFoundPage;
