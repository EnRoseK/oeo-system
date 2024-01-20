export const convertToDoubleDigit = (digit: number) => {
  return digit < 10 ? `0${digit}` : `${digit}`;
};
