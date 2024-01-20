import { Drawer } from '@/components';
import { useAnimation } from '@/hooks';
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from 'react';

interface DrawerContextType {
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  setContent: Dispatch<SetStateAction<ReactNode>>;
}

interface DrawerProviderProps {
  children: ReactNode;
}

export const DrawerContext = createContext<DrawerContextType>({} as DrawerContextType);

export const DrawerProvider: FC<DrawerProviderProps> = (props) => {
  const { children } = props;
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [renderDrawer, onAnimationEnd] = useAnimation(showDrawer);
  const [content, setContent] = useState<ReactNode>(<></>);

  const value = { setShowDrawer, setContent };

  return (
    <DrawerContext.Provider value={value}>
      {children}
      {renderDrawer && (
        <Drawer show={showDrawer} closeHandler={() => setShowDrawer(false)} onAnimationEnd={onAnimationEnd}>
          {content}
        </Drawer>
      )}
    </DrawerContext.Provider>
  );
};
