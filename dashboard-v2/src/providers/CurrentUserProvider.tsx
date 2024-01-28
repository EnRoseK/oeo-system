import { authServices } from '@/api/services';
import { IUser } from '@/interfaces';
import { useSession } from 'next-auth/react';
import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';

interface CurrentUserContextType {
  currentUser?: IUser;
  updateCurrentUser: (user: IUser) => void;
  removeCurrentUser: () => void;
}

interface CurrentUserProviderProps extends PropsWithChildren {}

export const CurrentUserContext = createContext<CurrentUserContextType>({} as CurrentUserContextType);

export const CurrentUserProvider: FC<CurrentUserProviderProps> = (props) => {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const { data, status } = useSession();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await authServices.me(data?.jwt!);

      updateCurrentUser(res);
    };

    if (data && status === 'authenticated') {
      fetchCurrentUser();
    }
  }, [data, status]);

  const updateCurrentUser = (user: IUser) => {
    setCurrentUser(user);
  };

  const removeCurrentUser = () => {
    setCurrentUser(undefined);
  };

  const value = { currentUser, updateCurrentUser, removeCurrentUser };

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
};
