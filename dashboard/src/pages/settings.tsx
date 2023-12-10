import { GeneralInformationForm, PasswordForm, ProfilePictureForm } from '@/components/features';
import { Breadcrumbs } from '@/components/ui';
import { translations } from '@/constants';
import { NextPage } from 'next';

const SettingsPage: NextPage = () => {
	return (
		<>
			<div className='grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900'>
				<div className='mb-4 col-span-full xl:mb-2'>
					<Breadcrumbs items={[{ title: translations.settings, url: '/settings' }]} />
					<h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white'>
						{translations.settings}
					</h1>
				</div>
				<div className='col-span-full xl:col-auto'>
					<ProfilePictureForm />
				</div>
				<div className='col-span-2'>
					<GeneralInformationForm />
					<PasswordForm />
				</div>
			</div>
		</>
	);
};

export default SettingsPage;
