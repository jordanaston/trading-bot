import { TradeType } from "../types/types";

interface TradeCardProps {
  trade: TradeType;
  botStatusActive: boolean;
}

const TradeDetail = ({
  label,
  value,
  className = "",
  minWidth = "auto",
}: {
  label: React.ReactNode;
  value: string | number;
  className?: string;
  minWidth?: string;
}) => (
  <div className={`text-xs mr-4 py-2 md:py-0 ${className}`}>
    <span className="font-semibold block" style={{ minWidth }}>
      {label}
    </span>
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
      className={`${borderColor} p-4 rounded-md shadow-xl text-white mt-4 w-full xl:w-[1040px] max-w-[1040px] border`}
    >
      <div className="flex flex-wrap">
        <TradeDetail label="Symbol" value={trade.symbol} />
        <TradeDetail label="Side" value={trade.side} />
        <TradeDetail label="Type" value={trade.type} />
        {trade.usdtCapital && (
          <TradeDetail
            label="USDT Capital"
            value={`$${trade.usdtCapital}`}
            minWidth="100px"
          />
        )}
        {trade.side === "SELL" && (
          <TradeDetail
            label="USDT Capital"
            value={`$${trade.usdtReceived}`}
            minWidth="100px"
          />
        )}
        {trade.purchaseAmount && (
          <TradeDetail
            label="Purchase Amount"
            value={`$${trade.purchaseAmount}`}
            minWidth="110px"
          />
        )}
        {trade.closeAmount && (
          <TradeDetail
            label="Close Amount"
            value={`$${trade.closeAmount}`}
            minWidth="110px"
          />
        )}
        {trade.usdtPercentage && (
          <TradeDetail label="Percentage" value={`${trade.usdtPercentage}%`} />
        )}

        {trade.symbolPrice && (
          <TradeDetail
            label="Price"
            value={`$${trade.symbolPrice}`}
            minWidth="90px"
          />
        )}
        <TradeDetail label="Quantity" value={trade.quantity} minWidth="70px" />

        <TradeDetail
          label="Timestamp"
          value={new Date(trade.timestamp).toLocaleString()}
        />
        <TradeDetail
          label="Order"
          value={trade.testOrder ? "TEST" : "BINANCE"}
        />
        {trade.change && (
          <TradeDetail
            label={<span className="text-white">Change</span>}
            value={`${trade.change > 0 ? "+" : ""}${trade.change}%`}
            className={trade.change > 0 ? "text-green-500" : "text-red-500"}
          />
        )}
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
