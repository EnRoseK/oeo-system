import { Icons } from '@/libs';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';

export const ThemeSwitcher: FC = () => {
	const [mounted, setMounted] = useState<boolean>(false);
	const { systemTheme, theme, setTheme } = useTheme();
	const currentTheme = theme === 'system' ? systemTheme : theme;

	const toggleTheme = () => {
		setTheme(currentTheme == 'dark' ? 'light' : 'dark');
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<button
			onClick={toggleTheme}
			type='button'
			className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'
		>
			<span>
				{currentTheme === 'dark' ? <Icons.FiSun size={20} /> : <Icons.FiMoon size={20} />}
			</span>
		</button>
	);
};
