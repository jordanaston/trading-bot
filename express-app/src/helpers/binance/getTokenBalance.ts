import binanceClient from "../../client/binanceClient";

export const getTokenBalance = async (symbol: string) => {
  try {
    symbol = symbol.replace(/USDT$/, "");
    const accountInfo = await binanceClient.accountInfo();
    const isTokenHeld = accountInfo.balances.some((b) => b.asset === symbol);

    if (!isTokenHeld) {
      console.warn(`Token ${symbol} is not held in the account.`);
      throw new Error(`Balance for symbol ${symbol} not found.`);
    }
    const tokenBalance = accountInfo.balances.find((b) => b.asset === symbol);

    if (!tokenBalance) {
      throw new Error(`Balance for symbol ${symbol} not found.`);
    }

    return parseFloat(tokenBalance.free);
  } catch (error) {
    console.error(`Failed to fetch balance for symbol ${symbol}:`, error);
    throw new Error(`Could not retrieve balance for symbol ${symbol}`);
  }
};
