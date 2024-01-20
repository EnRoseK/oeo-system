import { useEffect, useState } from 'react';

export const useAnimation = (show: boolean) => {
  const [shouldRender, setRender] = useState<boolean>(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return [shouldRender, onAnimationEnd] as const;
};
