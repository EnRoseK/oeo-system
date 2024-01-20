import { DrawerContext } from '@/providers';
import { ReactNode, useContext } from 'react';

export const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error('Context must be used inside provider!');
  }

  const { setContent, setShowDrawer } = ctx;

  const openDrawer = (content: ReactNode) => {
    setContent(content);
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
    setContent('');
  };

  return [openDrawer, closeDrawer] as const;
};
