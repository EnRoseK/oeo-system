export const GET_FILTERED_EXPENSES = (params: string) => `/expenses?${params}`;
export const CREATE_EXPENSE = '/expenses';
export const REMOVE_EXPENSE = (id: string) => `/expenses/${id}`;
