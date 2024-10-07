export interface TradeType {
  symbol: string;
  side: string;
  type: string;
  usdtCapital?: number;
  purchaseAmount?: number;
  symbolPrice?: number;
  quantity: number;
  timestamp: Date;
}
