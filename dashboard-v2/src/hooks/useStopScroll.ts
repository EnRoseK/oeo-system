import { useEffect } from 'react';

export const useStopScroll = (show: boolean) => {
  useEffect(() => {
    document.body.style.overflowY = show ? 'hidden' : 'auto';
  }, [show]);
};
