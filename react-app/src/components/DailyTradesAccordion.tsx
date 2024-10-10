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

const groupTradesByDate = (trades: TradeType[]) => {
  const groupedTrades: Record<string, TradeType[]> = {};

  trades.forEach((trade) => {
    const dateKey = formatDate(new Date(trade.timestamp));
    if (!groupedTrades[dateKey]) {
      groupedTrades[dateKey] = [];
    }
    groupedTrades[dateKey].push(trade);
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
            <span>{date}</span>
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
              (groupedTrades[date].length > 0 ? (
                groupedTrades[date].map((trade) => (
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
