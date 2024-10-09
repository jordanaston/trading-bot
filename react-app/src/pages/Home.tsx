import { DotLoader } from "react-spinners";
import useGetAllTrades from "../hooks/useGetAllTrades";
import { TradeType } from "../types/types";
import TradeCard from "../components/TradeCard";
import Nav from "../components/Nav";
import useGetBotStatus from "../hooks/useGetBotStatus";

function Home() {
  const {
    data: trades,
    isLoading: tradesIsLoading,
    error: tradesError,
  } = useGetAllTrades();

  const { data: botStatusData, refetch: refetchBotStatus } = useGetBotStatus();

  const botStatusActive = botStatusData?.active;

  return (
    <div className="font-mono mb-40">
      <Nav refetchBotStatus={refetchBotStatus} />
      <img src="/ares.png" alt="Ares" className="mx-auto mt-4 w-16 h-16" />
      <div className="flex justify-center mt-8 mb-10">
        {botStatusActive && (
          <DotLoader size={30} color="#fff" loading={!tradesIsLoading} />
        )}
      </div>
      {tradesError && (
        <p className="text-red-500 text-sm text-center">Error loading trades</p>
      )}
      <div className="mx-[5%]">
        {Array.isArray(trades) && (
          <ul>
            {trades.map((trade: TradeType) => {
              return (
                <li key={trade.timestamp.toString()}>
                  <TradeCard trade={trade} botStatusActive={botStatusActive} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
