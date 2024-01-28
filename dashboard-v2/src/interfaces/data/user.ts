export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  permission: {
    category: boolean;
    product: boolean;
    productIncome: boolean;
    productExpense: boolean;
    expense: boolean;
    productReport: boolean;
    incomeReport: boolean;
    user: boolean;
  };
  createdAt: string;
  updatedAt: string;
}
