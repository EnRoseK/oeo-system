import { getCurrentUser } from '@/api/services';
import { IUser } from '@/interfaces/data/user';
import { useRouter } from 'next/router';
import { FC, ReactNode, createContext, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  currentUser?: IUser;
  fetchCurrentUser: () => Promise<void>;
  clearUser: () => void;
  updateUser: (data: IUser) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await getCurrentUser();

      setCurrentUser(res.data);
    } catch (error) {
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };

  const clearUser = () => {
    setCurrentUser(undefined);
  };

  const updateUser = (data: IUser) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const value = { currentUser, fetchCurrentUser, clearUser, updateUser };

  if (isLoading) return <></>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
