import React, { ComponentProps, FC } from 'react';

interface SelectProps extends ComponentProps<'select'> {
	label?: string;
	id?: string;
	name?: string;
}

export const Select: FC<SelectProps> = ({ label, id, name, ...rest }) => {
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
			<select
				id={id}
				name={name}
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
				{...rest}
			>
				<option selected>Select category</option>
				<option value='FL'>Flowbite</option>
				<option value='RE'>React</option>
				<option value='AN'>Angular</option>
				<option value='VU'>Vue</option>
			</select>
		</div>
	);
};
