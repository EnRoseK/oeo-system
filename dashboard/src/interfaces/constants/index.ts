import { IconType } from 'react-icons';

export interface ISidebarItem {
	title: string;
	url: string;
	icon: IconType;
}

export interface IUserMenuItem {
	title: string;
	url: string;
}

export interface IBreadcrumbItem {
	title: string;
	url: string;
}
