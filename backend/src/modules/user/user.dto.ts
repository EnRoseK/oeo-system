export interface CreateUserBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: 'ADMIN' | 'ACCOUNTANT' | 'USER';
}
