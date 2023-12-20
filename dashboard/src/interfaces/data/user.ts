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
  financeIncome: IPermissionItem;
  financeExpense: IPermissionItem;
  users: IPermissionItem;
  log: IPermissionItem;
}

export interface IPermissionItem {
  read: boolean;
  update: boolean;
  delete: boolean;
  create: boolean;
}
