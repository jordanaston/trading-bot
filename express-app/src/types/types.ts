export interface TradeType {
  symbol: string;
  side: string;
  type: string;
  usdtCapital?: number;
  purchaseAmount?: number;
  usdtPercentage?: number;
  symbolPrice?: number;
  quantity: number;
  timestamp: Date;
  testOrder?: boolean;
  usdtReceived?: number;
  closeAmount?: number;
  change?: number;
  error?: string;
}
