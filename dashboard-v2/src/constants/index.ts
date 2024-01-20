import { ISidebarItem, IUserMenuItem } from '@/interfaces';
import { Icons } from '@/libs';

export const translations = {
  dashboard: 'Хянах самбар',
  products: 'Урвалжууд',
  categories: 'Урвалж ангилал',
  productIncome: 'Урвалж орлого',
  productOutcome: 'Шинжилгээ',
  users: 'Хэрэглэгчид',
  settings: 'Тохиргоо',
  logout: 'Гарах',
  login: 'Нэвтрэх',
  productReport: 'Урвалж тайлан',
  incomeReport: 'Орлого тайлан',
  expense: 'Зарлага',
};

export const UserMenuItems: IUserMenuItem[] = [
  { title: translations.dashboard, url: '/' },
  { title: translations.settings, url: '/settings' },
  { title: translations.logout, url: '/logout' },
];

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
    url: '/products/categories',
    icon: Icons.BiSolidCategory,
  },
  {
    title: translations.productIncome,
    url: '/products/income',
    icon: Icons.GrDocumentStore,
  },
  {
    title: translations.productOutcome,
    url: '/products/outcome',
    icon: Icons.IoDocumentsOutline,
  },
  {
    title: translations.expense,
    url: '/expenses',
    icon: Icons.GiExpense,
  },
  {
    title: translations.productReport,
    url: '/reports/product',
    icon: Icons.GrDocumentTest,
  },
  {
    title: translations.incomeReport,
    url: '/reports/income',
    icon: Icons.GrDocumentDownload,
  },
  {
    title: translations.users,
    url: '/users',
    icon: Icons.FiUsers,
  },
  {
    title: translations.settings,
    url: '/settings',
    icon: Icons.FaCog,
  },
];

export const PAGE_SIZE = 5;
