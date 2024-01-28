import { IconType } from 'react-icons';

export interface IUserMenuItem {
  title: string;
  url: string;
}

export interface ISidebarItem {
  title: string;
  url: string;
  icon: IconType;
  child?: {
    title: string;
    url: string;
    permissionKey?: (
      | 'category'
      | 'expense'
      | 'incomeReport'
      | 'product'
      | 'productExpense'
      | 'productIncome'
      | 'productReport'
      | 'user'
    )[];
  }[];
  permissionKey?: (
    | 'category'
    | 'expense'
    | 'incomeReport'
    | 'product'
    | 'productExpense'
    | 'productIncome'
    | 'productReport'
    | 'user'
  )[];
}

export interface IBreadcrumbItem {
  title: string;
  url: string;
}
