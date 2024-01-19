import { ISidebarItem, IUserMenuItem } from '@/interfaces';
import { Icons } from '@/libs';

export const translations = {
  dashboard: 'Хянах самбар',
  products: 'Урвалжууд',
  categories: 'Урвалж ангилал',
  productIncome: 'Урвалж орлого',
  productOutcome: 'Шинжилгээ',
  financeIncome: 'Санхүүгийн орлого',
  financeExpense: 'Санхүүгийн зарлага',
  users: 'Хэрэглэгчид',
  log: 'Лог',
  settings: 'Тохиргоо',
  logout: 'Гарах',
  login: 'Нэвтрэх',
  productReport: 'Урвалж тайлан',
  incomeReport: 'Орлого тайлан',
  expense: 'Зарлага',
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
    permissionKey: 'product',
  },
  {
    title: translations.categories,
    url: '/categories',
    icon: Icons.BiSolidCategory,
    permissionKey: 'category',
  },
  {
    title: translations.productIncome,
    url: '/products/income',
    icon: Icons.GrDocumentStore,
    permissionKey: 'productIncome',
  },
  {
    title: translations.productOutcome,
    url: '/products/outcome',
    icon: Icons.IoDocumentsOutline,
    permissionKey: 'productOutcome',
  },
  {
    title: translations.expense,
    url: '/expenses',
    icon: Icons.GiExpense,
    permissionKey: 'expenses',
  },
  {
    title: translations.productReport,
    url: '/reports/product',
    icon: Icons.GrDocumentTest,
    permissionKey: 'productReport',
  },
  {
    title: translations.incomeReport,
    url: '/reports/income',
    icon: Icons.GrDocumentDownload,
    permissionKey: 'incomeReport',
  },
  {
    title: translations.users,
    url: '/users',
    icon: Icons.FiUsers,
    permissionKey: 'users',
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

export const PAGE_SIZE = 5;
