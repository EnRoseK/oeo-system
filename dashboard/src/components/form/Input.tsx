import { ComponentProps, FC } from 'react';

interface InputProps extends ComponentProps<'input'> {
	label?: string;
	id?: string;
	name?: string;
	error?: boolean;
	errorMsg?: string;
}

export const Input: FC<InputProps> = ({ label, id, name, error = false, errorMsg, ...rest }) => {
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
				className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
					error ? 'ring-red-600 border-red-600 dark:ring-red-500 dark:border-red-500' : ''
				}`}
				{...rest}
			/>
			{error && <p className='italic text-xs mt-1 text-red-600 dark:text-red-500'>{errorMsg}</p>}
		</div>
	);
};
