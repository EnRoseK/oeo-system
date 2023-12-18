export const GET_FILTERED_FINANCE_EXPENSES = (params: string) => `/finance/expenses?${params}`;
export const CREATE_FINANCE_EXPENSE = '/finance/expenses';
export const REMOVE_FINANCE_EXPENSE = (id: string) => `/finance/expenses/${id}`;
