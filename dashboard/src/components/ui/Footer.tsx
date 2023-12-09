import Link from 'next/link';
import { FC } from 'react';

export const Footer: FC = () => {
	return (
		<footer>
			<p className='my-10 text-sm text-center text-gray-500'>
				© 2023{' '}
				<Link href='https://nexustech.mn/' className='hover:underline' target='_blank'>
					Nexus Technology
				</Link>
				.
			</p>
		</footer>
	);
};
