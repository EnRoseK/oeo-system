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
  }[];
}

export interface IBreadcrumbItem {
  title: string;
  url: string;
}
