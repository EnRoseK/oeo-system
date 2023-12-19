export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'USER' | 'ACCOUNTANT' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}
