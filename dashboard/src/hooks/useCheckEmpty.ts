import { useEffect, useState } from 'react';

export const useCheckEmpty = (length: number) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [length]);

  return isEmpty;
};
