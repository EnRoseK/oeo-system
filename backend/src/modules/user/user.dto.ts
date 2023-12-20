export interface createUserBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  permission: {
    category: { read: boolean; update: boolean; delete: boolean; create: boolean };
    product: { read: boolean; update: boolean; delete: boolean; create: boolean };
    productIncome: { read: boolean; update: boolean; delete: boolean; create: boolean };
    productOutcome: { read: boolean; update: boolean; delete: boolean; create: boolean };
    financeIncome: { read: boolean; update: boolean; delete: boolean; create: boolean };
    financeExpense: { read: boolean; update: boolean; delete: boolean; create: boolean };
    users: { read: boolean; update: boolean; delete: boolean; create: boolean };
    log: { read: boolean; update: boolean; delete: boolean; create: boolean };
  };
}

export interface updateUserInfoBody {
  email: string;
  firstName: string;
  lastName: string;
}

export interface updateUserPasswordBody {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

export interface updateUserPermissionParams {
  id?: string;
}

export interface updateUserPermissionBody {
  permission: {
    category: { read: boolean; update: boolean; delete: boolean; create: boolean };
    product: { read: boolean; update: boolean; delete: boolean; create: boolean };
    productIncome: { read: boolean; update: boolean; delete: boolean; create: boolean };
    productOutcome: { read: boolean; update: boolean; delete: boolean; create: boolean };
    financeIncome: { read: boolean; update: boolean; delete: boolean; create: boolean };
    financeExpense: { read: boolean; update: boolean; delete: boolean; create: boolean };
    users: { read: boolean; update: boolean; delete: boolean; create: boolean };
    log: { read: boolean; update: boolean; delete: boolean; create: boolean };
  };
}
