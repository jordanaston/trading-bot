import { Accordion, AccordionItem } from "@szhsin/react-accordion";
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex justify-center items-center">
      <Accordion>
        {dates.map((date, index) => (
          <AccordionItem
            key={date}
            header={
              <div
                onClick={() => toggleAccordion(index)}
                className="flex justify-center items-center text-white cursor-pointer border p-4 rounded-md mt-4 sm:hover:bg-gray-600 sm:hover:bg-opacity-20 lg:min-w-[1040px]"
              >
                <span>{date}</span>
                <div className="text-xl ml-2">
                  {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </div>
              </div>
            }
          >
            {openIndex === index &&
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
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DailyTradesAccordion;
