import { useStopScroll } from '@/hooks';
import { AnimationComponent } from '@/interfaces';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface DrawerProps extends AnimationComponent {
  children: ReactNode;
  closeHandler: () => void;
}

export const Drawer: FC<DrawerProps> = (props) => {
  const { children, show, closeHandler, onAnimationEnd } = props;

  useStopScroll(show);

  return (
    <>
      <div
        onAnimationEnd={onAnimationEnd}
        className={classNames(
          'fixed top-0 right-0 z-40 w-full h-screen max-w-sm p-4 overflow-y-auto bg-white dark:bg-gray-800',
          {
            'animate-drawerOpen': show,
            'animate-drawerClose': !show,
          },
        )}
        tabIndex={-1}
      >
        {children}
      </div>

      <div
        onAnimationEnd={onAnimationEnd}
        onClick={closeHandler}
        className={classNames('bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30', {
          'animate-fadeIn': show,
          'animate-fadeOut': !show,
        })}
      />
    </>
  );
};
