import { DotLoader } from "react-spinners";
import useGetAllTrades from "../hooks/useGetAllTrades";
import { TradeType } from "../types/types";
import TradeCard from "../components/TradeCard";
import Nav from "../components/Nav";
import useGetBotStatus from "../hooks/useGetBotStatus";

type HomeProps = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

function Home({ setIsLoggedIn }: HomeProps) {
  const {
    data: trades,
    isLoading: tradesIsLoading,
    error: tradesError,
  } = useGetAllTrades();

  const { data: botStatusData, refetch: refetchBotStatus } = useGetBotStatus();

  const botStatusActive = botStatusData?.active;

  return (
    <div className="font-mono mb-40">
      <Nav setIsLoggedIn={setIsLoggedIn} refetchBotStatus={refetchBotStatus} />
      <h1 className="text-center text-md mt-8 text-white">
        Ares is {botStatusActive ? "activated" : "deactivated"}
      </h1>
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
