export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
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
  createdAt: string;
  updatedAt: string;
}
