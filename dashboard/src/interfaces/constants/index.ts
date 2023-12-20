import { IconType } from 'react-icons';

export interface ISidebarItem {
  title: string;
  url: string;
  icon: IconType;
  permissionKey?:
    | 'category'
    | 'product'
    | 'productIncome'
    | 'productOutcome'
    | 'financeIncome'
    | 'financeExpense'
    | 'users'
    | 'log';
}

export interface IUserMenuItem {
  title: string;
  url: string;
}

export interface IBreadcrumbItem {
  title: string;
  url: string;
}

export interface IPagination {
  total: number;
  currentPage: number;
  totalPage: number;
}
