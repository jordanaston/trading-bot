import binanceClient from "../../client/binanceClient";

export const getUSDTValue = async () => {
  try {
    const accountInfo = await binanceClient.accountInfo();

    const usdtBalance = accountInfo.balances.find(
      (balance) => balance.asset === "USDT"
    );

    if (!usdtBalance) {
      throw new Error("USDT balance not found");
    }

    return Number(usdtBalance.free);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching USDT value:", error.message);
      throw error;
    } else {
      console.error("An unknown error occurred while fetching USDT value");
      throw new Error("An unknown error occurred");
    }
  }
};

export default getUSDTValue;
