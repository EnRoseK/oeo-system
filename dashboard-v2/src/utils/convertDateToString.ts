import { convertToDoubleDigit } from '@/utils';

export const convertDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}/${convertToDoubleDigit(month + 1)}/${convertToDoubleDigit(day)}`;
};
