import { ISidebarItem, IUserMenuItem } from '@/interfaces';
import { Icons } from '@/libs';

export const translations = {
	dashboard: 'Хянах самбар',
	products: 'Урвалжууд',
	categories: 'Урвалж ангилал',
	productIncome: 'Урвалж орлого',
	productExpense: 'Урвалж зарлага',
	financeIncome: 'Санхүүгийн орлого',
	financeExpense: 'Санхүүгийн зарлага',
	users: 'Хэрэглэгчид',
	log: 'Лог',
	settings: 'Тохиргоо',
	logout: 'Гарах',
	login: 'Нэвтрэх',
};

export const SidebarItems: ISidebarItem[] = [
	{
		title: translations.dashboard,
		url: '/',
		icon: Icons.HiChartPie,
	},
	{
		title: translations.products,
		url: '/products',
		icon: Icons.GiChemicalDrop,
	},
	{
		title: translations.categories,
		url: '/categories',
		icon: Icons.BiSolidCategory,
	},
	{
		title: translations.productIncome,
		url: '/products/income',
		icon: Icons.GrDocumentStore,
	},
	{
		title: translations.productExpense,
		url: '/products/expenses',
		icon: Icons.IoDocumentsOutline,
	},
	{
		title: translations.financeIncome,
		url: '/finances/income',
		icon: Icons.GiReceiveMoney,
	},
	{
		title: translations.financeExpense,
		url: '/finances/expenses',
		icon: Icons.FaMoneyBillTransfer,
	},
	{
		title: translations.users,
		url: '/users',
		icon: Icons.FiUsers,
	},
	{
		title: translations.log,
		url: '/logs',
		icon: Icons.GrHistory,
	},
	{
		title: translations.settings,
		url: '/settings',
		icon: Icons.FaCog,
	},
];

export const UserMenuItems: IUserMenuItem[] = [
	{ title: translations.dashboard, url: '/' },
	{ title: translations.settings, url: '/settings' },
	{ title: translations.logout, url: '/logout' },
];
