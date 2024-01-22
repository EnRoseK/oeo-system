export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: IRole;
  createdAt: string;
  updatedAt: string;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
