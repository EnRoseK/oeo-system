import { ISidebarItem, IUserMenuItem } from '@/interfaces';
import { Icons } from '@/libs';

export const siteName = 'Онч Энх Онош';

export const translations = {
  dashboard: 'Хянах самбар',
  products: 'Урвалжууд',
  categories: 'Урвалж ангилал',
  productIncome: 'Урвалж орлого',
  productExpense: 'Шинжилгээ',
  users: 'Хэрэглэгчид',
  settings: 'Тохиргоо',
  logout: 'Гарах',
  login: 'Нэвтрэх',
  productReport: 'Урвалж тайлан',
  incomeReport: 'Орлого тайлан',
  expense: 'Зарлага',
  report: 'Тайлан',
  product: 'Урвалж',
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
    title: translations.product,
    url: '#',
    icon: Icons.GiChemicalDrop,
    permissionKey: ['product', 'category', 'productIncome', 'productExpense'],
    child: [
      {
        title: translations.products,
        url: '/products',
        permissionKey: ['product'],
      },
      {
        title: translations.categories,
        url: '/products/categories',
        permissionKey: ['category'],
      },
      {
        title: translations.productIncome,
        url: '/products/income',
        permissionKey: ['productIncome'],
      },
      {
        title: translations.productExpense,
        url: '/products/expense',
        permissionKey: ['productExpense'],
      },
    ],
  },
  {
    title: translations.expense,
    url: '/expenses',
    icon: Icons.GiExpense,
    permissionKey: ['expense'],
  },
  {
    title: translations.report,
    url: '#',
    icon: Icons.GrDocumentDownload,
    permissionKey: ['productReport', 'incomeReport'],
    child: [
      { title: translations.productReport, url: '/reports/product', permissionKey: ['productReport'] },
      { title: translations.incomeReport, url: '/reports/income', permissionKey: ['incomeReport'] },
    ],
  },
  {
    title: translations.users,
    url: '/users',
    icon: Icons.FiUsers,
    permissionKey: ['user'],
  },
  {
    title: translations.settings,
    url: '/settings',
    icon: Icons.FaCog,
  },
];

export const PAGE_SIZE = 10;
