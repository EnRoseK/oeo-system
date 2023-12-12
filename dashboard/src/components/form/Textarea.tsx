import { ComponentProps, FC } from 'react';

interface TextareaProps extends ComponentProps<'textarea'> {
	label?: string;
	id?: string;
	name?: string;
	error?: boolean;
	errorMsg?: string;
}

export const Textarea: FC<TextareaProps> = ({
	label,
	id,
	name,
	error = false,
	errorMsg,
	...rest
}) => {
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
			<textarea
				id={id}
				name={name}
				className={`resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
					error ? 'ring-red-600 border-red-600 dark:ring-red-500 dark:border-red-500' : ''
				}`}
				{...rest}
			/>
			{error && <p className='italic text-xs mt-1 text-red-600 dark:text-red-500'>{errorMsg}</p>}
		</div>
	);
};
