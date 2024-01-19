export interface createProductOutcomeBody {
  productId: string;
  basePrice: number;
  quantity: number;
  payment: 'CARD' | 'CASH' | 'TRANSFER' | 'RENT';
}
