import { TradeType } from "../types/types";

interface TradeCardProps {
  trade: TradeType;
  botStatusActive: boolean;
}

const TradeDetail = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string | number;
  className?: string;
}) => (
  <div className={`text-xs mr-4 py-2 md:py-0 ${className}`}>
    <span className="font-semibold block">{label}</span>
    {value}
  </div>
);

const TradeCard = ({ trade, botStatusActive }: TradeCardProps) => {
  const borderColor = trade.error
    ? "border-gray-400"
    : trade.testOrder === true
    ? botStatusActive
      ? "border-orange-500"
      : "border-gray-400"
    : botStatusActive
    ? trade.side.toLowerCase() === "buy"
      ? "border-green-500"
      : "border-red-500"
    : "border-gray-400";

  return (
    <div
      className={`${borderColor} p-4 rounded-md shadow-lg text-white my-4 max-w-[1000px] border mx-auto`}
    >
      <div className="flex flex-wrap">
        <TradeDetail label="Symbol" value={trade.symbol} />
        <TradeDetail label="Side" value={trade.side} />
        <TradeDetail label="Type" value={trade.type} />
        {trade.usdtCapital && (
          <TradeDetail label="USDT Capital" value={`$${trade.usdtCapital}`} />
        )}
        {trade.purchaseAmount && (
          <TradeDetail
            label="Purchase Amount"
            value={`$${trade.purchaseAmount}`}
          />
        )}
        {trade.usdtPercentage && (
          <TradeDetail label="Percentage" value={`${trade.usdtPercentage}%`} />
        )}
        {trade.tokenSoldValue && (
          <TradeDetail
            label="Token Sold Value"
            value={`$${trade.tokenSoldValue}`}
          />
        )}
        {trade.side === "SELL" && (
          <TradeDetail
            label="USDT Balance After Sell"
            value={`$${trade.usdtReceived}`}
          />
        )}
        {trade.symbolPrice && (
          <TradeDetail label="Price" value={`$${trade.symbolPrice}`} />
        )}
        <TradeDetail label="Quantity" value={trade.quantity} />
        <TradeDetail
          label="Timestamp"
          value={new Date(trade.timestamp).toLocaleString()}
        />
        <TradeDetail
          label="Order"
          value={trade.testOrder ? "TEST" : "BINANCE"}
        />
        {trade.error && (
          <TradeDetail
            label="Error"
            value={trade.error}
            className="w-full mt-2 text-red-500"
          />
        )}
      </div>
    </div>
  );
};

export default TradeCard;
