export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  permission: IPermission;
  createdAt: string;
  updatedAt: string;
}

export interface IPermission {
  category: IPermissionItem;
  product: IPermissionItem;
  productIncome: IPermissionItem;
  productOutcome: IPermissionItem;
  productReport: IPermissionItem;
  incomeReport: IPermissionItem;
  users: IPermissionItem;
  expenses: IPermissionItem;
}

export interface IPermissionItem {
  read: boolean;
  update: boolean;
  delete: boolean;
  create: boolean;
}
