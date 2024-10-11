import { TradeType } from "../types/types";
import TradeCard from "./TradeCard";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";

interface DailyTradesAccordionProps {
  trades: TradeType[];
  botStatusActive: boolean;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatResponsiveDate = (date: Date, isSmallScreen: boolean) => {
  if (isSmallScreen) {
    return new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      month: "numeric",
      day: "numeric",
      year: "numeric",
    })
      .format(date)
      .replace(",", "");
  }
  return formatDate(date);
};

const groupTradesByDate = (trades: TradeType[]) => {
  const groupedTrades: Record<
    string,
    {
      trades: TradeType[];
      buys: number;
      sells: number;
      sellChangeTotal: number;
    }
  > = {};

  trades.forEach((trade) => {
    const dateKey = formatDate(new Date(trade.timestamp));
    if (!groupedTrades[dateKey]) {
      groupedTrades[dateKey] = {
        trades: [],
        buys: 0,
        sells: 0,
        sellChangeTotal: 0,
      };
    }
    groupedTrades[dateKey].trades.push(trade);
    if (trade.side === "BUY") {
      groupedTrades[dateKey].buys += 1;
    } else if (trade.side === "SELL") {
      groupedTrades[dateKey].sells += 1;
      groupedTrades[dateKey].sellChangeTotal += trade.change || 0;
    }
  });

  return groupedTrades;
};

const DailyTradesAccordion = ({
  trades,
  botStatusActive,
}: DailyTradesAccordionProps) => {
  const groupedTrades = groupTradesByDate(trades);
  const dates = Object.keys(groupedTrades);
  const todayDateKey = formatDate(new Date());
  const initialOpenIndices =
    dates.indexOf(todayDateKey) >= 0 ? [dates.indexOf(todayDateKey)] : [];

  const [openIndices, setOpenIndices] = useState<number[]>(initialOpenIndices);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prevOpenIndices) =>
      prevOpenIndices.includes(index)
        ? prevOpenIndices.filter((i) => i !== index)
        : [...prevOpenIndices, index]
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {dates.map((date, index) => (
        <>
          <button
            key={date}
            onClick={() => toggleAccordion(index)}
            className="flex justify-center items-center text-white cursor-pointer border p-4 rounded-md mt-4 w-full max-w-[1040px]"
          >
            <span className="block sm:hidden">
              {formatResponsiveDate(new Date(date), true)}
            </span>
            <span className="hidden sm:block">{date}</span>
            <span className="ml-2 text-sm text-gray-400">
              {groupedTrades[date].buys}:{groupedTrades[date].sells}
            </span>
            <span
              className={`ml-2 text-sm ${
                groupedTrades[date].sellChangeTotal > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {groupedTrades[date].sellChangeTotal > 0 ? "+" : ""}
              {groupedTrades[date].sellChangeTotal.toFixed(4)}%
            </span>
            <div className="text-xl ml-2">
              {openIndices.includes(index) ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
          </button>

          <div>
            {openIndices.includes(index) &&
              (groupedTrades[date].trades.length > 0 ? (
                groupedTrades[date].trades.map((trade) => (
                  <TradeCard
                    key={trade.timestamp.toString()}
                    trade={trade}
                    botStatusActive={botStatusActive}
                  />
                ))
              ) : (
                <p className="text-gray-500">No trades for this date.</p>
              ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default DailyTradesAccordion;
