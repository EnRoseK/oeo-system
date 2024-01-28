import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    jwt: string;
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: IRole;
    createdAt: string;
    updatedAt: string;
  }

  interface DefaultUser {
    jwt: string;
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: IRole;
    createdAt: string;
    updatedAt: string;
  }
}
