import { CloseIcon, WarningIcon } from '@/assets/icons';
import { FC } from 'react';
import { MediumButton } from '../form';

interface PopupProps {
	show: boolean;
	title: string;
	confirm: ((value: unknown) => void) | null;
	cancel: ((reason?: any) => void) | null;
}

export const Popup: FC<PopupProps> = ({ show, title, confirm, cancel }) => {
	return (
		<>
			{show && (
				<>
					<div
						tabIndex={-1}
						className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
					>
						<div className='relative p-4 w-full max-w-md max-h-full'>
							<div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
								<button
									onClick={() => cancel && cancel()}
									type='button'
									className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
								>
									<CloseIcon width={16} height={16} />
								</button>
								<div className='p-4 md:p-5 text-center'>
									<WarningIcon classNames='mx-auto mb-4 text-gray-400 dark:text-gray-200' />

									<h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
										{title}
									</h3>
									<span className='me-2'>
										<MediumButton onClick={() => confirm && confirm(null)} variant='danger'>
											Тийм
										</MediumButton>
									</span>
									<MediumButton onClick={() => cancel && cancel()} variant='white'>
										Үгүй
									</MediumButton>
								</div>
							</div>
						</div>
					</div>

					<div
						onClick={() => cancel && cancel()}
						className='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30'
					></div>
				</>
			)}
		</>
	);
};
