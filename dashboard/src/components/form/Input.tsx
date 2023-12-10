import { ComponentProps, FC } from 'react';

interface InputProps extends ComponentProps<'input'> {
	label?: string;
	id?: string;
	name?: string;
}

export const Input: FC<InputProps> = ({ label, id, name, ...rest }) => {
	return (
		<div>
			{label && (
				<label
					htmlFor={id}
					className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
				>
					{label}
				</label>
			)}
			<input
				name={name}
				id={id}
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
				{...rest}
			/>
		</div>
	);
};
