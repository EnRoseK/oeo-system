export const convertNumberToCurrency = (number: number, symbol?: string) => {
  if (!symbol) {
    symbol = '₮';
  }

  const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${formattedNumber}${symbol}`;
};
