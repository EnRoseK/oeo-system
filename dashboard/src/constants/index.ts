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
    title: translations.financeIncome,
    url: '/finances/income',
    icon: Icons.GiReceiveMoney,
    permissionKey: 'financeIncome',
  },
  {
    title: translations.financeExpense,
    url: '/finances/expense',
    icon: Icons.FaMoneyBillTransfer,
    permissionKey: 'financeExpense',
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
